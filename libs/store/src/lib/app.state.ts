import { ProductState } from './products';
import { StorageState } from './storage';

export interface AppState {
  products: ProductState;
  storages: StorageState;
}
