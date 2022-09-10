import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  getSelectedProduct,
  getSelectedStorage,
  Product,
  selectProduct,
  updateProduct,
} from '@stockeer/store';
import { filter, map, Observable, of, pluck, switchMap } from 'rxjs';
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

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // TODO move that somewhere globally
    function isNotUndefined<T>(p: T | undefined | null): p is T {
      return !!p;
    }

    // Uses product from product id or creates a new one if the id cannot be found
    this.product$ = this.route.params.pipe(
      pluck('productId'),
      map((productId) => this.store.dispatch(selectProduct({ productId }))),
      switchMap(() => this.store.select(getSelectedProduct)),
      switchMap((p) => {
        if (p) return of(p);

        return this.store.select(getSelectedStorage).pipe(
          filter(isNotUndefined),
          map((storage) => {
            const product: Product = {
              id: v4(),
              storageId: storage.id,
              name: '',
              barcode: '',
              expiryDate: new Date().toISOString(),
              quantity: { amount: 1, unit: Unit.PIECE },
            };
            return product;
          })
        );
      })
    );
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
