import { ProductState } from './products';
import { StorageState } from './storage';
import { FetchState } from './fetch.service';
import { Stockeer } from './types';

export interface AppState {
  products: ProductState;
  storages: StorageState;
  stockeers: FetchState<Stockeer> & { all: string[] };
}
