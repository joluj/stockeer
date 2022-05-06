import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  ensureStoragesLoaded,
  removeStorage,
  addProduct,
  removeProduct,
} from '@stockeer/store';
import { getStorages } from '@stockeer/store';
import { addStorage } from '@stockeer/store';
import { ProductDto } from '@stockeer/dtos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stockeer-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly storages$ = this.store.select(getStorages);

  constructor(
    protected store: Store<AppState>,
    protected readonly httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.store.dispatch(ensureStoragesLoaded());

    const product: ProductDto = {} as never;

    this.httpClient.get<ProductDto>('test').subscribe({
      error: () => {},
    });

    console.log(product);
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
