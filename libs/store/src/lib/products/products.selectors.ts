import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter } from './products.reducer';
import { AppState } from '../app.state';
import { ProductState } from './products.state';

const PRODUCT_STORE_KEY: keyof AppState = 'products';
export const getProductsState =
  createFeatureSelector<ProductState>(PRODUCT_STORE_KEY);

const { selectAll } = productsAdapter.getSelectors();

export const getProducts = createSelector(getProductsState, (state) =>
  selectAll(state)
);

export const getSelectedProduct = createSelector(getProductsState, (state) =>
  state.selected ? state.entities[state.selected] : undefined
);
