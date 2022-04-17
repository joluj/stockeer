import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadProductsSuccess } from './products.actions';
import { ensureStoragesLoaded } from '../storage';
import { exhaustMap, of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  readonly ensureLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ensureStoragesLoaded),
      exhaustMap(() => {
        // TODO call service
        return of(loadProductsSuccess({ products: [] }));
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
