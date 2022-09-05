import { FetchState } from '../fetch.service';
import {
  EntitySuccessBlock,
  ErrorBlock,
  FetchBlock,
  LoadingBlock,
} from './FetchBlock';
import { Observable } from 'rxjs';
import { FetchPipeline } from './FetchPipeline';
import { Store } from '@ngrx/store';
import { FetchReducerManager } from './FetchReducerManager';

/*
TODO: Add shortcut for default settings
TODO: Add option to allow single id requests
 */

export class FetchPipelineBuilder<
  SubStatePath extends string,
  SubState extends FetchState<Entity>,
  GlobalState extends { [key in SubStatePath]: SubState } = {
    [key in SubStatePath]: SubState;
  },
  Entity = GlobalState[SubStatePath] extends FetchState<infer E> ? E : never
> {
  constructor(
    public readonly prefix: string,
    public readonly subStatePath: SubStatePath,
    public readonly store: Store<GlobalState>,
    public readonly reducerManager: FetchReducerManager
  ) {}

  static Create<
    SubStatePath extends string,
    SubState extends FetchState<Entity>,
    GlobalState extends { [key in SubStatePath]: SubState } = {
      [key in SubStatePath]: SubState;
    },
    Entity = GlobalState[SubStatePath] extends FetchState<infer E> ? E : never
  >(
    prefix: string,
    subStatePath: SubStatePath,
    store: Store<GlobalState>,
    reducerManager: FetchReducerManager
  ): FetchPipelineBuilder<SubStatePath, SubState, GlobalState, Entity> {
    return new FetchPipelineBuilder<
      SubStatePath,
      SubState,
      GlobalState,
      Entity
    >(prefix, subStatePath, store, reducerManager);
  }

  // TODO: Allow custom LoadingBlock
  addLoadingBlock(): FetchPipelineBuilderWithLoading<
    { ids: string[] },
    SubStatePath,
    SubState,
    GlobalState,
    Entity
  > {
    return new FetchPipelineBuilderWithLoading(
      this,
      new LoadingBlock(this.prefix, 'Loading')
    );
  }
}

export class FetchPipelineBuilderWithLoading<
  LoadingInput,
  SubStatePath extends string,
  SubState extends FetchState<Entity>,
  GlobalState extends { [key in SubStatePath]: SubState } = {
    [key in SubStatePath]: SubState;
  },
  Entity = GlobalState[SubStatePath] extends FetchState<infer E> ? E : never
> {
  constructor(
    public readonly builder: FetchPipelineBuilder<
      SubStatePath,
      SubState,
      GlobalState,
      Entity
    >,
    public readonly loadingBlock: FetchBlock<LoadingInput, Entity, SubState>
  ) {}

  // TODO: Allow custom LoadingBlock
  addEntitiesSuccessBlock(
    getId: (e: Entity) => string
  ): FetchPipelineBuilderWithSuccess<
    { entities: Entity[] },
    LoadingInput,
    SubStatePath,
    SubState,
    GlobalState,
    Entity
  > {
    class E extends EntitySuccessBlock<
      { entities: Entity[] },
      Entity,
      SubState
    > {
      override getId(e: Entity) {
        return getId(e);
      }
    }

    return new FetchPipelineBuilderWithSuccess(
      this,
      new E(this.builder.prefix, 'Success')
    );
  }
}

export class FetchPipelineBuilderWithSuccess<
  SuccessInput,
  LoadingInput,
  SubStatePath extends string,
  SubState extends FetchState<Entity>,
  GlobalState extends { [key in SubStatePath]: SubState } = {
    [key in SubStatePath]: SubState;
  },
  Entity = GlobalState[SubStatePath] extends FetchState<infer E> ? E : never
> {
  constructor(
    public readonly builder: FetchPipelineBuilderWithLoading<
      LoadingInput,
      SubStatePath,
      SubState,
      GlobalState,
      Entity
    >,
    public readonly successBlock: FetchBlock<SuccessInput, Entity, SubState>
  ) {}

  addErrorBlock() {
    return new FetchPipelineBuilderWithError<
      { ids: string[] },
      SuccessInput,
      LoadingInput,
      SubStatePath,
      SubState,
      GlobalState,
      Entity
    >(
      this,
      new ErrorBlock<{ ids: string[] }, Entity, SubState>(
        this.builder.builder.prefix,
        'Error'
      )
    );
  }
}

export class FetchPipelineBuilderWithError<
  ErrorInput,
  SuccessInput,
  LoadingInput,
  SubStatePath extends string,
  SubState extends FetchState<Entity>,
  GlobalState extends { [key in SubStatePath]: SubState } = {
    [key in SubStatePath]: SubState;
  },
  Entity = GlobalState[SubStatePath] extends FetchState<infer E> ? E : never
> {
  constructor(
    private readonly builder: FetchPipelineBuilderWithSuccess<
      SuccessInput,
      LoadingInput,
      SubStatePath,
      SubState,
      GlobalState,
      Entity
    >,
    public readonly errorBlock: FetchBlock<ErrorInput, Entity, SubState>
  ) {}

  addFetchMethod(
    load$: (input: LoadingInput) => Observable<SuccessInput>
  ): FetchPipeline<
    SubState,
    Entity,
    LoadingInput,
    SuccessInput,
    ErrorInput,
    SubStatePath,
    GlobalState
  > {
    class Pipeline extends FetchPipeline<
      SubState,
      Entity,
      LoadingInput,
      SuccessInput,
      ErrorInput,
      SubStatePath,
      GlobalState
    > {
      load$(input: LoadingInput): Observable<SuccessInput> {
        return load$(input) as never;
      }
    }

    const { subStatePath, store, reducerManager } =
      this.builder.builder.builder;

    return new Pipeline(
      subStatePath,
      store,
      reducerManager,
      this.builder.builder.loadingBlock,
      this.builder.successBlock,
      this.errorBlock
    );
  }
}
