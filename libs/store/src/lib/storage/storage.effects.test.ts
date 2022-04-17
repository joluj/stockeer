import { Store } from '@ngrx/store';
import { AppState, StoreModuleImports } from '@stockeer/store';
import { TestBed } from '@angular/core/testing';
import { ensureStoragesLoaded } from './storage.actions';
import { firstValueFrom } from 'rxjs';
import { getStorages } from './storages.selectors';

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

  it('should work', async () => {
    store.dispatch(ensureStoragesLoaded());

    const actual = await select(getStorages);
    expect(actual).toHaveLength(0);
  });
});
