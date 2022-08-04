import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import {
  addProductSuccess,
  removeProductSuccess,
  updateProductSuccess,
} from './products.actions';

import { ProductState, ProductStateEntity } from '.';

export const productsAdapter = createEntityAdapter<ProductStateEntity>();

export const initialState: ProductState = productsAdapter.getInitialState({
  selected: null,
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProductsSuccess, (state, { products }) => {
    return productsAdapter.setAll(products, state);
  }),
  on(ProductsActions.selectProduct, (state, { productId }) => ({
    ...state,
    selected: productId,
  })),
  on(addProductSuccess, (state, { product }) => {
    return productsAdapter.setOne(product, state);
  }),
  on(removeProductSuccess, (state, { productId }) => {
    return productsAdapter.removeOne(productId, state);
  }),
  on(updateProductSuccess, (state, { product }) => {
    return productsAdapter.updateOne(
      { id: product.id, changes: product },
      state
    );
  })
);
