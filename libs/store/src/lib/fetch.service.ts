import { catchError, defer, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Optional } from 'utility-types';
import {
  ActionReducer,
  createAction,
  createReducer,
  on,
  props,
  Store,
} from '@ngrx/store';
import { memoize } from './memoize';

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
  Entity,
  State extends FetchState<Entity>,
  ReducerPath extends string
>(config: {
  reducerPath: ReducerPath;
  initialState: Optional<State, keyof FetchState<Entity>>;
  getId: (entity: Entity) => string;
}): {
  actions: FetchActions;
  reducer: ActionReducer<State>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Service: AbstractConstructor<Entity, State, ReducerPath>;
} {
  function prefix(actionName: string) {
    return `[${config.reducerPath}] ${actionName}`;
  }

  const actions = {
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
      // TODO find out why the typing is so strange here (twice "...state")
      const newState: Partial<State> = {
        ...(state as State),
        loading: state.loading.concat(ids),
      };
      return { ...state, ...newState };
    }),
    on(actions.success, (state, { entities }) => {
      const newState: Partial<State> = {
        ...(state as State),
        loading: state.loading.filter(
          (id) => !entities.some((e) => config.getId(e) === id)
        ),
        errors: state.errors.filter(
          (id) => !entities.some((e) => config.getId(e) === id)
        ),
        ids: state.ids.concat(entities.map((e) => config.getId(e))),
        entities: {
          ...state.entities,
          ...entities.reduce(
            (prev, entity) => ({
              ...prev,
              [config.getId(entity)]: entity,
            }),
            {}
          ),
        },
      };

      return { ...state, ...newState };
    }),
    on(actions.error, (state, { ids }) => ({
      ...state,
      errors: state.errors.concat(ids),
    }))
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
  State extends FetchState<Entity> = FetchState<Entity>
> {
  protected constructor(
    private readonly reducerPath: ReducerPath,
    private readonly initialState: Optional<State, keyof FetchState<Entity>>,
    private readonly store: Store<Record<ReducerPath, State>>
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
   * @param id Id of the entity
   * @private
   */
  protected getWrapper$(id: string): FetchInfo$<Entity> {
    // TODO avoid unnecessary emits
    return this.store.select((globalState) => {
      const state = globalState[this.reducerPath];
      if (state.loading.includes(id)) {
        return {
          state: 'fetching',
          data: state.entities[id],
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
          data: state.entities[id],
        };
      }

      return { state: 'fetching' };
    });
  }

  @memoize()
  get$(id: string): { data: FetchInfo$<Entity>; retry: () => void } {
    return {
      data: defer(() => {
        this.markAsLoading(id);
        return this.load$(id).pipe(
          catchError((err) => {
            // TODO Error handling
            console.error(err);
            this.markAsError(id);
            return EMPTY;
          }),
          tap((entity) => {
            this.markAsSuccess(entity);
          }),
          switchMap((entity) => {
            return this.getWrapper$(this.getId(entity));
          })
        );
      }),
      retry: () => {
        // TODO
      },
    };
  }

  protected markAsSuccess(entity: Entity, ...entities: Entity[]) {
    this.store.dispatch(
      this.actions.success({ entities: [entity, ...entities] })
    );
  }

  protected markAsError(id: string, ...ids: string[]) {
    this.store.dispatch(this.actions.error({ ids: [id, ...ids] }));
  }

  protected markAsLoading(id: string, ...ids: string[]) {
    this.store.dispatch(this.actions.loading({ ids: [id, ...ids] }));
  }
}
