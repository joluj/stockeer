import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addStorage,
  AppState,
  getProducts,
  getStorages,
  Product,
  removeProduct,
} from '@stockeer/store';
import { distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { selectStorage } from '@stockeer/store';

@Component({
  selector: 'stockeer-page-product-overview',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit, OnDestroy {
  products$?: Observable<Product[]>;

  /**
   * TODO Remove. It's just there for a mvp example
   */
  currentStorageId?: string;

  /**
   * TODO Remove. It's just there for a mvp example
   * @private
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}

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
        .pipe(
          map((storages) => storages[0]?.id),
          distinctUntilChanged()
        )
        .subscribe((storageId) => {
          this.currentStorageId = storageId;
          if (this.currentStorageId) {
            this.store.dispatch(selectStorage({ storageId }));
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  async triggerAddProduct() {
    const storageId = this.currentStorageId;
    if (!storageId) {
      window.alert('Please create a storage first');
      return;
    }
    // const name = window.prompt('New Product name');
    // if (!name) return;
    //
    // this.store.dispatch(addProduct({ name, storageId }));

    await this.router.navigate(['products', 'new']);
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
