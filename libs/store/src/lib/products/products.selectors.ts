import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter } from './products.reducer';
import { AppState } from '../app.state';
import { ProductState, ProductStateEntity } from './products.state';
import { Product } from '../types';

export function toProductEntity(product: ProductStateEntity): Product {
  return new Product({
    id: product.id,
    name: product.name,
    expiryDate: product.expiryDate,
    quantity: product.quantity,
    barcode: product.barcode,
    storageId: product.storageId,
  });
}

const PRODUCT_STORE_KEY: keyof AppState = 'products';
export const getProductsState =
  createFeatureSelector<ProductState>(PRODUCT_STORE_KEY);

const { selectAll } = productsAdapter.getSelectors();

export const getProducts = createSelector(
  getProductsState,
  (s: AppState) => s.storages.selected,
  (state, selectedStorageIds): Product[] =>
    selectAll(state)
      .filter((p) => selectedStorageIds.includes(p.storageId))
      .map(toProductEntity)
);

/**
 * @internal
 */
export const getProductsDict = createSelector(
  getProductsState,
  (state) => state.entities
);

export const getSelectedProduct = createSelector(getProductsState, (state) =>
  state.selected ? state.entities[state.selected] : undefined
);
