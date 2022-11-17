import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  getProducts,
  getSelectedStorages,
  Product,
  removeProduct,
  Stockeer,
} from '@stockeer/store';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'stockeer-page-product-overview',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  products$?: Observable<Product[]>;
  selectedStockeers$?: Observable<Stockeer[]>;

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

    this.selectedStockeers$ = this.store.select(getSelectedStorages);
  }

  async triggerAddProduct() {
    await this.router.navigate(['products', 'new']);
  }

  triggerRemoveProduct(product: Product) {
    this.store.dispatch(
      removeProduct({ productId: product.id, storageId: product.storageId })
    );
  }
}
