import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  getSelectedProduct,
  getSelectedStorages,
  getStorages,
  Product,
  selectProduct,
  Stockeer,
  updateProduct,
} from '@stockeer/store';
import { map, Observable, of, pluck, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptionalId } from '@stockeer/gui-addit-product';
import { v4 } from 'uuid';
import { Unit } from '@stockeer/types';

@Component({
  selector: 'stockeer-page-product-overview',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  product$?: Observable<Product>;
  stockeers$?: Observable<Stockeer[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // Uses product from product id or creates a new one if the id cannot be found
    this.product$ = this.route.params.pipe(
      pluck('productId'),
      map((productId) => this.store.dispatch(selectProduct({ productId }))),
      switchMap(() => this.store.select(getSelectedProduct)),
      switchMap((p) => {
        if (p) return of(p);

        return this.store.select(getSelectedStorages).pipe(
          map((storages) => {
            return new Product({
              id: v4(),
              storageId: storages[0]?.id,
              name: '',
              expiryDate: new Date().toISOString(),
              quantity: { amount: 1, unit: Unit.PIECE },
            });
          })
        );
      })
    );

    this.stockeers$ = this.store.select(getStorages);
  }

  async save(product: ProductOptionalId) {
    if (!product.id) {
      window.alert('Creating new products is not yet supported');
      return;
    }
    this.store.dispatch(
      updateProduct({ productId: product.id, updates: product })
    );

    await this.router.navigate(['/']);
  }
}
