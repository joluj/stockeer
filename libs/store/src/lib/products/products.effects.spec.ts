import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import {
  AppState,
  ensureProductsLoaded,
  getProducts,
  StoreModuleImports,
} from '@stockeer/store';

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

  it('should work', async () => {
    store.dispatch(ensureProductsLoaded());

    const actual = await select(getProducts);
    expect(actual).toHaveLength(0);
  });
});
