import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { IProduct } from '@stockeer/dtos';
import { ProductState } from '.';
import { addProductSuccess, removeProductSuccess } from './products.actions';

export const productsAdapter: EntityAdapter<IProduct> =
  createEntityAdapter<IProduct>();

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
  })
);
