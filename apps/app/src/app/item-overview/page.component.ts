import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addProduct,
  addStorage,
  AppState,
  getProducts,
  getStorages,
  Product,
  removeProduct,
} from '@stockeer/store';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'stockeer-page-product-overview',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit, OnDestroy {
  products$?: Observable<Product[]>;

  /**
   * TODO Remove. It's just there for a mvp example
   * @private
   */
  private currentStorageId?: string;

  /**
   * TODO Remove. It's just there for a mvp example
   * @private
   */
  private subscriptions: Subscription[] = [];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store
      .select(getProducts)
      .pipe(
        map((products) =>
          products
            .slice()
            .sort(
              (a, b) =>
                new Date(a.expiryDate).getTime() -
                new Date(b.expiryDate).getTime()
            )
        )
      );

    this.subscriptions.push(
      this.store
        .select(getStorages)
        .subscribe((storages) => (this.currentStorageId = storages[0]?.id))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  triggerAddProduct() {
    const storageId = this.currentStorageId;
    if (!storageId) {
      window.alert('Please create a storage first');
      return;
    }
    const name = window.prompt('New Product name');
    if (!name) return;

    this.store.dispatch(addProduct({ name, storageId }));
  }

  triggerAddStockeer() {
    if (this.currentStorageId != null) {
      window.alert('Only one storage is allowed in alpha');
      return;
    }

    const name = window.prompt('New Stockeer');
    if (!name) return;

    this.store.dispatch(addStorage({ name }));
  }

  triggerRemoveProduct(productId: string) {
    const storageId = this.currentStorageId;
    if (!storageId) return;
    this.store.dispatch(removeProduct({ productId, storageId }));
  }
}
