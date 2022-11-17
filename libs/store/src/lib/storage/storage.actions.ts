import { createAction, props } from '@ngrx/store';
import { StorageStateEntity } from './storage.state';

function prefix(name: string) {
  return `[Storages] ${name}`;
}

export const ensureStoragesLoaded = createAction(prefix('Ensure Storages'));

export const loadStoragesSuccess = createAction(
  prefix('Load Storages Success'),
  props<{ storages: StorageStateEntity[] }>()
);

export const setStorageSelection = createAction(
  prefix('Select Storages'),
  props<{ storageIds: string[] }>()
);

export const addStorage = createAction(
  prefix('Add Storage'),
  props<{ name: string }>()
);

/**
 * @internal
 */
export const setStorageSuccess = createAction(
  prefix('Set Storage Success'),
  props<{ storage: StorageStateEntity }>()
);

export const removeStorage = createAction(
  prefix('Remove Storage'),
  props<{ storageId: string }>()
);

/**
 * @internal
 */
export const removeStorageSuccess = createAction(
  prefix('Remove Storage Success'),
  props<{ storageId: string }>()
);
