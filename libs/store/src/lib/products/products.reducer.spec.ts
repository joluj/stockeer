import { Action } from '@ngrx/store';

import { IProduct } from '@stockeer/dtos';
import { loadProductsSuccess, selectProduct } from './products.actions';
import { initialState, productsReducer } from './products.reducer';

describe('Products Reducer', () => {
  const createProductsEntity = (id: string, name = ''): IProduct => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Products actions', () => {
    it('loadProductsSuccess should return the list of known Products', () => {
      const products = [
        createProductsEntity('PRODUCT-AAA'),
        createProductsEntity('PRODUCT-zzz'),
      ];
      const action = loadProductsSuccess({ products });

      const result = productsReducer(initialState, action);

      expect(result.selected).toBe(null);
      expect(result.ids.length).toBe(2);
    });

    it('should update selection', () => {
      // Arrange
      const products = [
        createProductsEntity('PRODUCT-AAA'),
        createProductsEntity('PRODUCT-zzz'),
      ];
      productsReducer(initialState, loadProductsSuccess({ products }));

      // Act
      const actual = productsReducer(
        initialState,
        selectProduct({ productId: 'PRODUCT-AAA' })
      );

      expect(actual.selected).toBe('PRODUCT-AAA');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = productsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
