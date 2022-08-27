import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';
import {
  AppState,
  ensureProductsLoaded,
  getProducts,
  StoreModuleImports,
} from '..';
import { ProductService } from '@stockeer/services';
import { Unit } from '@stockeer/types';
import { ProductDto } from '@stockeer/dtos';

const mockList: ProductDto[] = [
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
    expiryDate: '02-01-2022',
    quantity: { amount: 1, unit: Unit.PIECE },
    storageId: 'test-storage-id-1',
    barcode: '',
  },
];

describe('ProductsEffects', () => {
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
    const service = TestBed.inject(ProductService);
    jest.spyOn(service, 'load').mockReturnValue(of(mockList));

    store.dispatch(ensureProductsLoaded());

    const actual = await select(getProducts);
    expect(actual).toHaveLength(2);
  });
});
