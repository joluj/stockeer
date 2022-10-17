import { getProducts, getSelectedProduct } from '.';

import { AppState } from '../app.state';
import { initialState, productsAdapter } from './products.reducer';
import { Product } from '../types';
import { DeepPartial } from 'utility-types';

describe('Products Selectors', () => {
  const createProductsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      storageId: 'test-storage-id',
    } as Product);

  let state: AppState;

  beforeEach(() => {
    state = {
      products: productsAdapter.setAll(
        [
          createProductsEntity('PRODUCT-AAA'),
          createProductsEntity('PRODUCT-BBB'),
          createProductsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selected: 'PRODUCT-BBB',
        }
      ),
      storages: {
        selected: ['test-storage-id'],
      },
    } as DeepPartial<AppState> as AppState;
  });

  describe('Products Selectors', () => {
    it('getAllProducts() should return the list of Products', () => {
      const results = getProducts(state);
      const selId = results[1].id;

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = getSelectedProduct(state);
      const selId = result?.id;

      expect(selId).toBe('PRODUCT-BBB');
    });
  });
});
