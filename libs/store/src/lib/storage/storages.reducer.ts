import { createEntityAdapter } from '@ngrx/entity';

import { on } from '@ngrx/store';
import { StorageState } from './storage.state';
import {
  loadStoragesSuccess,
  removeStorageSuccess,
  selectStorage,
  setStorageSuccess,
} from './storage.actions';
import { createImmerReducer } from 'ngrx-immer/store';
import { StorageDto } from '@stockeer/dtos';

export const storageAdapter = createEntityAdapter<StorageDto>();

export const initialState: StorageState = storageAdapter.getInitialState({
  selected: null,
});

export const storagesReducer = createImmerReducer(
  initialState,
  on(loadStoragesSuccess, (state, { storages }) => {
    return storageAdapter.setAll(storages, state);
  }),
  on(selectStorage, (state, { storageId }) => {
    return {
      ...state,
      selected: storageId,
    };
  }),
  on(setStorageSuccess, (state, { storage }) => {
    return storageAdapter.setOne(storage, state);
  }),
  on(removeStorageSuccess, (state, { storageId }) => {
    return storageAdapter.removeOne(storageId, state);
  })
);
