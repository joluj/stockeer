import { createEntityAdapter } from '@ngrx/entity';
import { IStorage } from '@stockeer/dtos';
import { createReducer, on } from '@ngrx/store';
import { StorageState } from './storage.state';
import { loadStoragesSuccess, selectStorage } from './storage.actions';

export const storageAdapter = createEntityAdapter<IStorage>();

export const initialState: StorageState = storageAdapter.getInitialState({
  selected: null,
});

export const storagesReducer = createReducer(
  initialState,
  on(loadStoragesSuccess, (state, { storages }) => {
    return storageAdapter.setAll(storages, state);
  }),
  on(selectStorage, (state, { storageId }) => {
    return {
      ...state,
      selected: storageId,
    };
  })
);
