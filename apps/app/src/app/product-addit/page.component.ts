import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  getSelectedProduct,
  Product,
  selectProduct,
} from '@stockeer/store';
import { filter, map, Observable, pluck, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stockeer-page-product-overview',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  product$?: Observable<Product>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    function isNotUndefined(p?: Product): p is Product {
      return !!p;
    }

    this.product$ = this.route.params.pipe(
      pluck('productId'),
      map((productId) => this.store.dispatch(selectProduct({ productId }))),
      switchMap(() => this.store.select(getSelectedProduct)),
      filter(isNotUndefined) // TODO use shared isNotUndefined method
    );
  }

  save() {
    // TODO implement
    window.alert('WIP');
  }
}
