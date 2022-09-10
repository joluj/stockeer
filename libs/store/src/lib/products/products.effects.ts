import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProductSuccess,
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
import { v4 } from 'uuid';
import { Unit } from '@stockeer/types';

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
        const isUpdate = !!products[action.productId];
        const p = products[action.productId] ?? {
          id: v4(),
          name: '',
          barcode: '',
          storageId: '',
          quantity: { amount: 1, unit: Unit.PIECE },
          expiryDate: new Date().toISOString(),
        };

        const newP = { ...p, ...action.updates };

        return this.service
          .setProduct(newP)
          .pipe(
            map((dto) =>
              isUpdate
                ? updateProductSuccess({ product: dto })
                : addProductSuccess({ product: dto })
            )
          );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    protected readonly service: ProductService
  ) {}
}
