import { createAction, props } from '@ngrx/store';
import { IProduct } from '@stockeer/dtos';

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
