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
import { IProduct } from '@stockeer/dtos';

const mockList: IProduct[] = [
  {
    id: 'test-product-id-1',
    name: 'test-product-name-1',
  },
  {
    id: 'test-product-id-2',
    name: 'test-product-name-2',
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