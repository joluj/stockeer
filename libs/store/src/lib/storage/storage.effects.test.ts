import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, timer } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

import {
  addProduct,
  addStorage,
  AppState,
  ensureProductsLoaded,
  getProducts,
  removeProduct,
  removeStorage,
  setStorageSelection,
  StoreModuleImports,
} from '..';
import { ensureStoragesLoaded, getStorages } from '.';
import { ProductService, StorageService } from '@stockeer/services';

import { getStoragesDict } from './storages.selectors';
import { Unit } from '@stockeer/types';
import { ProductDto, StorageDto } from '@stockeer/dtos';

const mockList: StorageDto[] = [
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

const mockListProducts: ProductDto[] = [
  {
    id: 'test-product-id-1',
    name: 'test-product-name-1',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-1',
    barcode: '',
  },
  {
    id: 'test-product-id-2',
    name: 'test-product-name-2',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-1',
    barcode: '',
  },
  {
    id: 'test-product-id-3',
    name: 'test-product-name-3',
    expiryDate: '01-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-2',
    barcode: '',
  },
];

describe('Storage Effects', () => {
  let store: Store<AppState>;

  function select<T>(selector: (input: AppState) => T) {
    return firstValueFrom(store.select(selector));
  }

  function selectAllStockeers() {
    store.dispatch(
      setStorageSelection({ storageIds: mockList.map((s) => s.id) })
    );
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [...StoreModuleImports],
    });
    store = TestBed.inject(Store);
    const storage = TestBed.inject(Storage);
    await storage.create();
  });

  it('should initialize', async () => {
    const service = TestBed.inject(StorageService);
    jest.spyOn(service, 'load').mockReturnValue(of(mockList));

    store.dispatch(ensureStoragesLoaded());
    selectAllStockeers();
    await firstValueFrom(timer(1));

    const actual = await select(getStorages);
    expect(actual).toHaveLength(2);
  });

  describe('Bigger Setup', () => {
    beforeEach(() => {
      const storageService = TestBed.inject(StorageService);
      const productService = TestBed.inject(ProductService);
      jest.spyOn(storageService, 'load').mockReturnValue(of(mockList));
      jest.spyOn(productService, 'load').mockReturnValue(of(mockListProducts));

      // mock local storage connections
      jest.spyOn(storageService, 'removeStockeer').mockReturnValue(of(void 0));
      jest
        .spyOn(storageService, 'setStockeer')
        .mockImplementation((x) => of(x as StorageDto));
      jest
        .spyOn(productService, 'setProduct')
        .mockImplementation((x) => of(x as ProductDto));
      jest.spyOn(productService, 'removeProduct').mockReturnValue(of(void 0));

      store.dispatch(ensureStoragesLoaded());
      store.dispatch(ensureProductsLoaded());
    });
    it('should be set up correctly', async () => {
      selectAllStockeers();
      // assert correct arrange
      expect(await select(getStorages)).toHaveLength(2);
      expect(await select(getProducts)).toHaveLength(3);
    });

    it('[addStorage] should work', async () => {
      selectAllStockeers();
      // act
      store.dispatch(addStorage({ name: 'new-storage' }));
      // assert
      expect(await select(getStorages)).toHaveLength(3);
      expect(await select(getProducts)).toHaveLength(3);
    });

    it('[removeStorage] should also remove products', async () => {
      selectAllStockeers();
      // act
      store.dispatch(removeStorage({ storageId: 'test-storage-id-1' }));
      // assert
      expect(await select(getStorages)).toHaveLength(1);
      expect(await select(getProducts)).toHaveLength(1);
    });

    it('[removeProduct] should also splice storage->products list', async () => {
      selectAllStockeers();
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
      selectAllStockeers();
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
