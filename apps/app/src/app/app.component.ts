import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addProduct,
  addStorage,
  AppState,
  ensureProductsLoaded,
  ensureStoragesLoaded,
  getStorages,
  removeProduct,
  removeStorage,
} from '@stockeer/store';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'stockeer-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly storages$ = this.store.select(getStorages);

  constructor(
    protected store: Store<AppState>,
    private readonly storage: Storage
  ) {}

  async ngOnInit() {
    // TODO Move this into service module
    this.storage.create().then(() => {
      this.store.dispatch(ensureProductsLoaded());
      this.store.dispatch(ensureStoragesLoaded());
    });

    await BarcodeScanner.hideBackground(); // make background of WebView transparent

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
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
