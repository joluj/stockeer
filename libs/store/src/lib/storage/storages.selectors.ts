import { AppState } from '@stockeer/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorageState } from './storage.state';
import { storageAdapter } from './storages.reducer';

const STORAGE_KEY: keyof AppState = 'storages';
export const getStoragesState =
  createFeatureSelector<StorageState>(STORAGE_KEY);

const { selectAll } = storageAdapter.getSelectors();

export const getStorages = createSelector(getStoragesState, selectAll);

export const getSelectedStorage = createSelector(getStoragesState, (state) => {
  if (state.selected) {
    return state.entities[state.selected] ?? null;
  }
  return null;
});
