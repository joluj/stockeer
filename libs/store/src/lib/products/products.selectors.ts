import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter } from './products.reducer';
import { AppState } from '../app.state';
import { ProductState } from './products.state';
import { IProduct, Unit } from '@stockeer/types';
import { ProductEntity } from '@stockeer/entities';

export function toProductEntity(product: IProduct): ProductEntity {
  return {
    id: product.id,
    name: product.name,
    expiryDate: '',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: product.storageId,
  };
}

const PRODUCT_STORE_KEY: keyof AppState = 'products';
export const getProductsState =
  createFeatureSelector<ProductState>(PRODUCT_STORE_KEY);

const { selectAll } = productsAdapter.getSelectors();

export const getProducts = createSelector(
  getProductsState,
  (state): ProductEntity[] => selectAll(state).map(toProductEntity)
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
