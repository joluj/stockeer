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
