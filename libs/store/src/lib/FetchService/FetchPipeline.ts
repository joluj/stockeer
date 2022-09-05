import { FetchBlock } from './FetchBlock';
import { FetchInfo, FetchInfo$, FetchState } from '../fetch.service';
import {
  catchError,
  defer,
  distinctUntilChanged,
  EMPTY,
  ignoreElements,
  merge,
  Observable,
  tap,
} from 'rxjs';
import { ActionReducer, Store } from '@ngrx/store';
import { FetchReducerManager } from './FetchReducerManager';

export abstract class FetchPipeline<
  SubState extends FetchState<Entity>,
  Entity,
  LoadInput,
  SuccessInput,
  ErrorInput,
  SubStatePath extends string,
  GlobalState extends { [key in SubStatePath]: SubState } = {
    [key in SubStatePath]: SubState;
  }
> {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(
    protected readonly subStatePath: SubStatePath,
    protected readonly store: Store<GlobalState>,
    protected readonly reducerManager: FetchReducerManager,
    protected readonly loadBlock: FetchBlock<LoadInput, Entity, SubState>,
    protected readonly successBlock: FetchBlock<SuccessInput, Entity, SubState>,
    protected readonly errorBlock: FetchBlock<ErrorInput, Entity, SubState>
  ) {
    this.reducerManager.addReducers(this.subStatePath, this.reducers);
  }

  get reducers(): Record<string, ActionReducer<SubState>> {
    return {
      [this.loadBlock.action.type]: this.loadBlock.reducer,
      [this.successBlock.action.type]: this.successBlock.reducer,
      [this.errorBlock.action.type]: this.errorBlock.reducer,
    };
  }

  trigger$(input: LoadInput): Observable<SuccessInput> {
    return defer(() => {
      // TODO validate types
      this.store.dispatch(this.loadBlock.action(input as never));

      return this.load$(input);
    }).pipe(
      catchError((err) => {
        console.error(err);
        this.errorBlock.action(input as never);
        return EMPTY;
      }),
      tap((serverOutput) => {
        // TODO validate types
        this.store.dispatch(this.successBlock.action(serverOutput as never));
      })
    );
  }

  triggerAndConvert$<T>(
    input: LoadInput,
    fetchId: string,
    convert: (state: GlobalState, id: string) => T
  ): FetchInfo$<T> {
    return merge(
      this.trigger$(input).pipe(ignoreElements()),
      this.convertToFetchInfo$(fetchId, convert)
    );
  }

  /**
   * This method is used to fetch data from the server
   * @param input
   */
  abstract load$(input: LoadInput): Observable<SuccessInput>;

  /**
   * Returns the state object but mapped to the {@link FetchInfo}.
   * @param requestId Id of the request
   * @param getData Method to extract the data from the state
   */
  convertToFetchInfo$<T>(
    requestId: string,
    getData: (state: GlobalState, id: string) => T
  ): FetchInfo$<T> {
    const s: FetchInfo$<T> = this.store.select((globalState) => {
      const state = globalState[this.subStatePath];
      if (state.loading.includes(requestId)) {
        return {
          state: 'fetching',
          data: getData(globalState, requestId),
        };
      }
      if (state.errors.includes(requestId)) {
        return {
          state: 'error',
          // TODO Error Type
          error: new Error('Unknown Error'),
        };
      }
      if (state.ids.includes(requestId)) {
        return {
          state: 'success',
          data: getData(globalState, requestId),
        };
      }

      return { state: 'fetching' };
    });

    return s.pipe(
      distinctUntilChanged<FetchInfo<T>>((previous, current) => {
        for (const key of Object.keys(previous)) {
          if (previous[key as never] !== current[key as never]) return false;
        }
        return true;
      })
    );
  }
}
