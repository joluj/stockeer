import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ensureProductsLoaded,
  loadProductsSuccess,
  updateProduct,
  updateProductSuccess,
} from './products.actions';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { ProductService } from '@stockeer/services';
import { Store } from '@ngrx/store';
import { AppState, getProductsDict } from '..';

@Injectable()
export class ProductsEffects {
  readonly ensureLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ensureProductsLoaded),
      exhaustMap(() => {
        return this.service.load().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  readonly updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      withLatestFrom(this.store.select(getProductsDict)),
      switchMap(([action, products]) => {
        const p = products[action.productId];
        if (!p) return EMPTY;

        const newP = { ...p, ...action.updates };

        return this.service
          .setProduct(newP)
          .pipe(map((dto) => updateProductSuccess({ product: dto })));
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    protected readonly service: ProductService
  ) {}
}
