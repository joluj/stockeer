import {
  ActionCreatorProps,
  ActionReducer,
  createAction,
  props,
} from '@ngrx/store';
import {
  FetchState,
  setToError,
  setToLoading,
  setToSuccess,
} from '../fetch.service';

export abstract class FetchBlock<
  ActionInput,
  Entity,
  State extends FetchState<Entity>
> {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(
    protected readonly prefix: string,
    protected readonly name: string
  ) {}

  get type() {
    return `[${this.prefix}] ${this.name}`;
  }

  get action() {
    return createAction(this.type, props<ActionCreatorProps<ActionInput>>());
  }

  abstract reducerFn(state: State, props: ActionInput): State;

  get reducer(): ActionReducer<State> {
    return (state, action) => {
      return this.reducerFn(state as State, action as never);
      // return state && action.type === this.type
      //   ? this.reducerFn(state as State, action as never)
      //   : (state as State);
    };
  }
}

export class LoadingBlock<
  ActionInput extends { ids: string[] },
  Entity,
  State extends FetchState<Entity>
> extends FetchBlock<ActionInput, Entity, State> {
  override reducerFn(state: State, props: ActionInput) {
    return setToLoading(state, props.ids);
  }
}

export class SuccessBlock<
  ActionInput extends { ids: string[] },
  Entity,
  State extends FetchState<Entity>
> extends FetchBlock<ActionInput, Entity, State> {
  override reducerFn(state: State, props: ActionInput) {
    return setToSuccess(state, props.ids);
  }
}

export abstract class EntitySuccessBlock<
  ActionInput extends { entities: Entity[] },
  Entity,
  State extends FetchState<Entity>
> extends FetchBlock<ActionInput, Entity, State> {
  override reducerFn(state: State, props: ActionInput) {
    const entities = props.entities.reduce(
      (entities, entity) => {
        entities[this.getId(entity)] = entity;
        return entities;
      },
      {
        ...state.entities,
      }
    );

    const newState: State = {
      ...(state as State),
      ids: state.ids.concat(props.entities.map((e) => this.getId(e))),
      entities,
    };

    return setToSuccess(
      newState,
      props.entities.map((e) => this.getId(e))
    );
  }

  abstract getId(entity: Entity): string;
}

export class ErrorBlock<
  ActionInput extends { ids: string[] },
  Entity,
  State extends FetchState<Entity>
> extends FetchBlock<ActionInput, Entity, State> {
  override reducerFn(state: State, props: ActionInput) {
    return setToError(state, props.ids);
  }
}
