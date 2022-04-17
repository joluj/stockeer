import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import { AppState, StoreModuleImports } from '..';
import { ensureStoragesLoaded } from './storage.actions';
import { getStorages } from './storages.selectors';
import { StorageService } from '@stockeer/services';
import { IStorage } from '@stockeer/dtos';

const mockList: IStorage[] = [
  {
    id: 'test-storage-id-1',
    name: 'test-storage-name-1',
    products: [],
  },
  {
    id: 'test-storage-id-2',
    name: 'test-storage-name-2',
    products: [],
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
});
