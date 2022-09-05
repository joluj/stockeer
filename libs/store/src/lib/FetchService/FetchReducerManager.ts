import { Action, ActionReducer, ReducerManager } from '@ngrx/store';

export class FetchReducerManager {
  constructor(protected readonly reducerManager: ReducerManager) {}

  addReducers<State>(
    feature: string,
    reducers: Record<string, ActionReducer<State>>
  ) {
    const current = this.reducerManager.currentReducers[feature];

    this.reducerManager.addReducer(feature, (state: State, action: Action) => {
      // Apply old reducer if existent
      const newState = current ? current(state, action) : state;

      const newReducer = reducers[action.type];

      // Apply new reducer if existent
      return newReducer ? newReducer(newState, action) : newState;
    });
  }
}
