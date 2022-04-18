import { AppState, getProductsDict, toProductEntity } from '..';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorageState } from './storage.state';
import { storageAdapter } from './storages.reducer';
import { IProduct, IStorage } from '@stockeer/dtos';
import { Dictionary } from '@ngrx/entity';
import { Storage } from '@stockeer/entities';

function isNotNull<T>(element: T | null | undefined): element is T {
  return element !== null && element !== undefined;
}

export function toStorageEntity(
  storage: IStorage,
  products: Dictionary<IProduct>
): Storage {
  return {
    id: storage.id,
    name: storage.name,
    products: storage.products
      .map((id) => products[id])
      .filter(isNotNull)
      .map(toProductEntity),
  };
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
  (state, products): Storage[] => {
    const all = selectAll(state);
    return all.map((storage) => toStorageEntity(storage, products));
  }
);

export const getSelectedStorage = createSelector(
  getStoragesState,
  getProductsDict,
  (state, products): Storage | null => {
    if (state.selected) {
      const storage = state.entities[state.selected];
      if (!storage) return null;
      return toStorageEntity(storage, products);
    }
    return null;
  }
);
