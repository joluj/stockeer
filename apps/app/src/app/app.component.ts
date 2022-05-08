import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addProduct,
  addStorage,
  AppState,
  ensureStoragesLoaded,
  getStorages,
  removeProduct,
  removeStorage,
} from '@stockeer/store';

@Component({
  selector: 'stockeer-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly storages$ = this.store.select(getStorages);

  constructor(protected store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(ensureStoragesLoaded());
  }

  triggerAddStorage() {
    this.store.dispatch(addStorage({ name: `New Storage` }));
  }

  triggerRemoveStorage(storageId: string) {
    this.store.dispatch(removeStorage({ storageId }));
  }

  triggerAddProduct(storageId: string) {
    this.store.dispatch(addProduct({ name: `New Product`, storageId }));
  }

  triggerRemoveProduct(productId: string, storageId: string) {
    this.store.dispatch(removeProduct({ productId, storageId }));
  }
}
