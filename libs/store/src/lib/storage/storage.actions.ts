import { createAction, props } from '@ngrx/store';
import { IStorage } from '@stockeer/dtos';

function prefix(name: string) {
  return `[Storages] ${name}`;
}

export const ensureStoragesLoaded = createAction(prefix('Ensure Storages'));

export const loadStoragesSuccess = createAction(
  prefix('Load Storages Success'),
  props<{ storages: IStorage[] }>()
);

export const selectStorage = createAction(
  prefix('Select Storage'),
  props<{ storageId: string | null }>()
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
  props<{ storage: IStorage }>()
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
