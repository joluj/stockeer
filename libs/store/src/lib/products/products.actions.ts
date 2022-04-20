import { createAction, props } from '@ngrx/store';
import { IProduct } from '@stockeer/types';

function prefix(name: string) {
  return `[Products] ${name}`;
}

export const ensureProductsLoaded = createAction(prefix('Ensure Loaded'));

/**
 * Replaces all products in the store
 */
export const loadProductsSuccess = createAction(
  prefix('Load Products Success'),
  props<{ products: IProduct[] }>()
);

export const selectProduct = createAction(
  prefix('Select Product'),
  props<{ productId: string | null }>()
);

export const addProduct = createAction(
  prefix('Add Product'),
  props<{ name: string; storageId: string }>()
);

/**
 * @internal
 */
export const addProductSuccess = createAction(
  prefix('Add Product Success'),
  props<{ product: IProduct }>()
);

export const removeProduct = createAction(
  prefix('Remove Product'),
  props<{ productId: string; storageId: string }>()
);

/**
 * @internal
 */
export const removeProductSuccess = createAction(
  prefix('Remove Product Success'),
  props<{ productId: string }>()
);
