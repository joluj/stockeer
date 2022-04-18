import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ensureProductsLoaded, loadProductsSuccess } from './products.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ProductService } from '@stockeer/services';

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

  constructor(
    private readonly actions$: Actions,
    protected readonly service: ProductService
  ) {}
}
