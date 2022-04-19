import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter } from './products.reducer';
import { AppState } from '../app.state';
import { ProductState } from './products.state';
import { IProduct } from '@stockeer/dtos';
import { Product, Unit } from '@stockeer/entities';

export function toProductEntity(product: IProduct): Product {
  return {
    id: product.id,
    name: product.name,
    expiryDate: '',
    quantity: { amount: 1, unit: Unit.PIECE },
  };
}

const PRODUCT_STORE_KEY: keyof AppState = 'products';
export const getProductsState =
  createFeatureSelector<ProductState>(PRODUCT_STORE_KEY);

const { selectAll } = productsAdapter.getSelectors();

export const getProducts = createSelector(
  getProductsState,
  (state): Product[] => selectAll(state).map(toProductEntity)
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
