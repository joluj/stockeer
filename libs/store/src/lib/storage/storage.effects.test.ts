import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import {
  addProduct,
  addStorage,
  AppState,
  ensureProductsLoaded,
  getProducts,
  removeProduct,
  removeStorage,
  StoreModuleImports,
} from '..';
import { ensureStoragesLoaded, getStorages } from '.';
import { ProductService, StorageService } from '@stockeer/services';

import { getStoragesDict } from './storages.selectors';
import { IProduct, IStorage, Unit } from '@stockeer/types';

const mockList: IStorage[] = [
  {
    id: 'test-storage-id-1',
    name: 'test-storage-name-1',
    products: ['test-product-id-1', 'test-product-id-2'],
  },
  {
    id: 'test-storage-id-2',
    name: 'test-storage-name-2',
    products: ['test-product-id-3'],
  },
];

const mockListProducts: IProduct[] = [
  {
    id: 'test-product-id-1',
    name: 'test-product-name-1',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-1',
  },
  {
    id: 'test-product-id-2',
    name: 'test-product-name-2',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-1',
  },
  {
    id: 'test-product-id-3',
    name: 'test-product-name-3',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-2',
  },
];

describe('Storage Effects', () => {
  let store: Store<AppState>;

  function select<T>(selector: (input: AppState) => T) {
    return firstValueFrom(store.select(selector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...StoreModuleImports],
    });
    store = TestBed.inject(Store);
  });

  it('should initialize', async () => {
    const service = TestBed.inject(StorageService);
    jest.spyOn(service, 'load').mockReturnValue(of(mockList));

    store.dispatch(ensureStoragesLoaded());

    const actual = await select(getStorages);
    expect(actual).toHaveLength(2);
  });

  describe('Bigger Setup', () => {
    beforeEach(() => {
      const storageService = TestBed.inject(StorageService);
      const productService = TestBed.inject(ProductService);
      jest.spyOn(storageService, 'load').mockReturnValue(of(mockList));
      jest.spyOn(productService, 'load').mockReturnValue(of(mockListProducts));

      store.dispatch(ensureStoragesLoaded());
      store.dispatch(ensureProductsLoaded());
    });
    it('should be set up correctly', async () => {
      // assert correct arrange
      expect(await select(getStorages)).toHaveLength(2);
      expect(await select(getProducts)).toHaveLength(3);
    });

    it('[addStorage] should work', async () => {
      // act
      store.dispatch(addStorage({ name: 'new-storage' }));
      // assert
      expect(await select(getStorages)).toHaveLength(3);
      expect(await select(getProducts)).toHaveLength(3);
    });

    it('[removeStorage] should also remove products', async () => {
      // act
      store.dispatch(removeStorage({ storageId: 'test-storage-id-1' }));
      // assert
      expect(await select(getStorages)).toHaveLength(1);
      expect(await select(getProducts)).toHaveLength(1);
    });

    it('[removeProduct] should also splice storage->products list', async () => {
      // assert correct arrange
      let storages = await select(getStoragesDict);
      expect(storages['test-storage-id-1']?.products).toHaveLength(2);

      // act
      store.dispatch(
        removeProduct({
          productId: 'test-product-id-1',
          storageId: 'test-storage-id-1',
        })
      );

      // assert
      storages = await select(getStoragesDict);
      expect(storages['test-storage-id-1']?.products).toHaveLength(1);
      expect(await select(getProducts)).toHaveLength(2);
    });

    it('[addProduct] should also update storage->products list', async () => {
      // assert correct arrange
      let storages = await select(getStoragesDict);
      expect(storages['test-storage-id-1']?.products).toHaveLength(2);

      // act
      store.dispatch(
        addProduct({
          name: 'test-product-name-17',
          storageId: 'test-storage-id-1',
        })
      );

      // assert
      storages = await select(getStoragesDict);
      expect(storages['test-storage-id-1']?.products).toHaveLength(3);
      expect(await select(getProducts)).toHaveLength(4);
    });
  });
});
