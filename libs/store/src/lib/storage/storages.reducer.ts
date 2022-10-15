import { createEntityAdapter } from '@ngrx/entity';

import { on } from '@ngrx/store';
import { StorageState } from './storage.state';
import {
  loadStoragesSuccess,
  removeStorageSuccess,
  setStorageSelection,
  setStorageSuccess,
} from './storage.actions';
import { createImmerReducer } from 'ngrx-immer/store';
import { StorageDto } from '@stockeer/dtos';

export const storageAdapter = createEntityAdapter<StorageDto>();

export const initialState: StorageState = storageAdapter.getInitialState({
  selected: [],
});

export const storagesReducer = createImmerReducer(
  initialState,
  on(loadStoragesSuccess, (state, { storages }) => {
    return storageAdapter.setAll(storages, state);
  }),
  on(setStorageSelection, (state, { storageIds }) => {
    return {
      ...state,
      selected: storageIds,
    };
  }),
  on(setStorageSuccess, (state, { storage }) => {
    return storageAdapter.setOne(storage, state);
  }),
  on(removeStorageSuccess, (state, { storageId }) => {
    return storageAdapter.removeOne(storageId, state);
  })
);
