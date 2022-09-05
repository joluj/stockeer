import { catchError, defer, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Optional, SetDifference } from 'utility-types';
import {
  ActionReducer,
  createAction,
  createReducer,
  on,
  props,
  Store,
} from '@ngrx/store';
import { memoize } from './memoize';
import { ActionCreator } from '@ngrx/store/src/models';
import { ReducerTypes } from '@ngrx/store/src/reducer_creator';

export function setToLoading<State extends FetchState<E>, E>(
  state: State,
  ids: string[]
): State {
  const newState: Pick<State, 'loading' | 'errors'> = {
    loading: state.loading.concat(ids),
    errors: state.errors.filter((e) => !ids.includes(e)),
  };

  return {
    ...state,
    ...newState,
  };
}

export function setToSuccess<State extends FetchState<E>, E>(
  state: State,
  ids: string[]
): State {
  const newState: Pick<State, 'loading' | 'errors' | 'success'> = {
    loading: state.loading.filter((e) => !ids.includes(e)),
    errors: state.errors.filter((e) => !ids.includes(e)),
    success: state.success.concat(ids),
  };

  return {
    ...state,
    ...newState,
  };
}

export function setToError<State extends FetchState<E>, E>(
  state: State,
  ids: string[]
): State {
  const newState: Pick<State, 'loading' | 'errors' | 'success'> = {
    loading: state.loading.filter((e) => !ids.includes(e)),
    errors: state.errors.concat(ids),
    success: state.success.filter((e) => !ids.includes(e)),
  };

  return {
    ...state,
    ...newState,
  };
}

export type FetchError = Error;

export type FetchInfoSuccess<T> = {
  state: 'success';
  data: T;
};
export type FetchInfoFetching<T> = {
  state: 'fetching';
  data?: T; // There might already be data there
};
export type FetchInfoError = {
  state: 'error';
  error: FetchError;
};

export type FetchInfo<T> =
  | FetchInfoSuccess<T>
  | FetchInfoFetching<T>
  | FetchInfoError;

export type FetchInfo$<T> = Observable<FetchInfo<T>>;

export type FetchState<E> = {
  ids: string[];
  entities: Record<string, E>;

  loading: string[];
  success: string[];
  errors: string[]; // TODO custom error type
};

export type FetchActions = {
  loading: ReturnType<typeof createAction>;
  error: ReturnType<typeof createAction>;
  success: ReturnType<typeof createAction>;
};

type AbstractConstructor<
  Entity,
  State extends FetchState<Entity>,
  ReducerPath extends string,
  T extends FetchService<Entity, ReducerPath, State> = FetchService<
    Entity,
    ReducerPath,
    State
  >
> = abstract new (store: Store<Record<ReducerPath, State>>) => T & {
  getId(e: Entity): string;

  get actions(): FetchActions;

  get reducer(): ActionReducer<State>;
};

export function FetchServiceClass<
  State extends FetchState<Entity>,
  ReducerPath extends string,
  Entity = State extends FetchState<infer E> ? E : never
  // AppStore = { [key in ReducerPath]: State }
>(config: {
  reducerPath: ReducerPath;
  initialState: Optional<State, keyof FetchState<Entity>>;
  getId: (entity: Entity) => string;
  actions?: Record<
    SetDifference<string, keyof FetchActions>,
    ReturnType<typeof createAction>
  >;
  reducer?: ReducerTypes<State, readonly ActionCreator[]>[];
}): {
  actions: FetchActions & typeof config['actions'];
  reducer: ActionReducer<State>;
  Service: AbstractConstructor<Entity, State, ReducerPath>;
} {
  function prefix(actionName: string) {
    return `[${config.reducerPath}] ${actionName}`;
  }

  const actions = {
    ...config.actions,
    loading: createAction(
      prefix('Loading single entities'),
      props<{ ids: string[] }>()
    ),
    success: createAction(
      prefix('Success single entities'),
      props<{ entities: Entity[] }>()
    ),
    error: createAction(
      prefix('Error single entities'),
      props<{ ids: string[] }>()
    ),
  };

  const baseState: FetchState<Entity> = {
    ids: [],
    errors: [],
    loading: [],
    success: [],
    entities: {},
  };
  const init: State = {
    ...baseState,
    ...config.initialState,
  } as never;

  const reducer: ActionReducer<State> = createReducer<State>(
    init,
    on(actions.loading, (state, { ids }) => {
      return setToLoading(state, ids);
    }),
    on(actions.success, (state, { entities }) => {
      const newEntities: Pick<State, 'entities'> = {
        entities: entities.reduce(
          (prev, entity) => ({
            ...prev,
            [config.getId(entity)]: entity,
          }),
          { ...state.entities }
        ),
      };
      return {
        ...setToSuccess(state, entities.map(config.getId)),
        ...newEntities,
      };
    }),
    on(actions.error, (state, { ids }) => setToError(state, ids)),
    ...(config.reducer ?? [])
  );

  abstract class Service extends FetchService<Entity, ReducerPath, State> {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(store: Store<Record<ReducerPath, State>>) {
      super(config.reducerPath, config.initialState, store);
    }

    override get actions() {
      return actions;
    }

    override get reducer() {
      return reducer;
    }

    override getId(entity: Entity): string {
      return config.getId(entity);
    }
  }

  return { actions, reducer, Service };
}

export abstract class FetchService<
  Entity,
  ReducerPath extends string,
  State extends FetchState<Entity> = FetchState<Entity>,
  GlobalState extends Record<ReducerPath, State> = Record<ReducerPath, State>
> {
  protected constructor(
    private readonly reducerPath: ReducerPath,
    private readonly initialState: Optional<State, keyof FetchState<Entity>>,
    private readonly store: Store<GlobalState>
  ) {}

  abstract get actions(): FetchActions;

  abstract get reducer(): ActionReducer<State>;

  abstract getId(entity: Entity): string;

  /**
   * Method to load entities from the server.
   * @param entity
   */
  abstract load$(entity: string): Observable<Entity>;

  /**
   * Returns the state object but mapped to the {@link FetchInfo}.
   * @param id Id of the request
   * @param getData Method to extract the data from the state
   * @private
   */
  protected convertToFetchInfo$<T>(
    id: string,
    getData: (state: GlobalState, id: string) => T
  ): FetchInfo$<T> {
    // TODO avoid unnecessary emits
    return this.store.select((globalState) => {
      const state = globalState[this.reducerPath];
      if (state.loading.includes(id)) {
        return {
          state: 'fetching',
          data: getData(globalState, id),
        };
      }
      if (state.errors.includes(id)) {
        return {
          state: 'error',
          // TODO Error Type
          error: new Error('Unknown Error'),
        };
      }
      if (state.ids.includes(id)) {
        return {
          state: 'success',
          data: getData(globalState, id),
        };
      }

      return { state: 'fetching' };
    });
  }

  /**
   * Converts an entity request to a {@link FetchInfo$} object
   * @param id entity id
   * @protected
   */
  protected getEntityFetchInfoConverter$(id: string): FetchInfo$<Entity> {
    return this.convertToFetchInfo$(
      id,
      (state, id) => state[this.reducerPath].entities[id]
    );
  }

  /**
   * Wrapper to load data from the service.
   * Should only be used internally by extending services.
   */
  protected fetch$<In, Out>(config: {
    // ID of the fetch request
    id: string;
    // Gets called to fetch the data from the server
    fetch: () => Observable<In>;
    // Gets called when the data was successfully loaded
    markAsSuccess: (entities: In) => void;
    // Gets called to wrap the data to a fetch info object
    onSuccess: (e: In) => FetchInfo$<Out>;
  }): {
    data: FetchInfo$<Out>;
    retry: () => void;
  } {
    const { id, fetch, onSuccess, markAsSuccess } = config;
    return {
      data: defer(() => {
        this.markAsLoading(id);
        return fetch().pipe(
          catchError((err) => {
            // TODO Error handling
            console.error(err);
            this.markAsError(id);
            return EMPTY;
          }),
          tap((entity) => {
            markAsSuccess(entity);
          }),
          switchMap((entity) => {
            return onSuccess(entity);
          })
        );
      }),
      retry: () => {
        // TODO
      },
    };
  }

  /**
   * Can be called to get a single object
   * @param id
   */
  @memoize()
  get$(id: string): { data: FetchInfo$<Entity>; retry: () => void } {
    return this.fetch$({
      id,
      fetch: () => this.load$(id),
      onSuccess: (entity) =>
        this.getEntityFetchInfoConverter$(this.getId(entity)),
      markAsSuccess: (entity) => this.markAsSuccess(entity),
    });
  }

  protected markAsSuccess(...entities: Entity[]) {
    this.store.dispatch(this.actions.success({ entities }));
  }

  protected markAsError(...ids: string[]) {
    this.store.dispatch(this.actions.error({ ids }));
  }

  protected markAsLoading(...ids: string[]) {
    this.store.dispatch(this.actions.loading({ ids }));
  }
}
