import {
  AppState,
  getProductsDict,
  ProductStateEntity,
  toProductEntity,
} from '..';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorageState } from './storage.state';
import { storageAdapter } from './storages.reducer';
import { Dictionary } from '@ngrx/entity';
import { StorageDto } from '@stockeer/dtos';
import { Stockeer } from '../types';

function isNotNull<T>(element: T | null | undefined): element is T {
  return element !== null && element !== undefined;
}

export function toStorageEntity(
  storage: StorageDto,
  products: Dictionary<ProductStateEntity>
): Stockeer {
  return new Stockeer({
    id: storage.id,
    name: storage.name,
    products: storage.products
      .map((id) => products[id])
      .filter(isNotNull)
      .map(toProductEntity),
  });
}

const STORAGE_KEY: keyof AppState = 'storages';
export const getStoragesState =
  createFeatureSelector<StorageState>(STORAGE_KEY);

const { selectAll } = storageAdapter.getSelectors();

/**
 * @internal
 */
export const getStoragesDict = createSelector(
  getStoragesState,
  (state) => state.entities
);
export const getStorages = createSelector(
  getStoragesState,
  getProductsDict,
  (state, products): Stockeer[] => {
    const all = selectAll(state);
    return all.map((storage) => toStorageEntity(storage, products));
  }
);

export const getSelectedStorages = createSelector(
  getStoragesState,
  getProductsDict,
  (state, products): Stockeer[] => {
    return state.selected
      .map((id) => state.entities[id])
      .filter(isNotNull)
      .map((e) => toStorageEntity(e, products));
  }
);
