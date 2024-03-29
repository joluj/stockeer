// noinspection JSUnusedGlobalSymbols -- effects are used by ngrx

import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  addStorage,
  ensureStoragesLoaded,
  loadStoragesSuccess,
  removeStorage,
  removeStorageSuccess,
  setStorageSelection,
  setStorageSuccess,
} from './storage.actions';
import {
  catchError,
  EMPTY,
  exhaustMap,
  from,
  map,
  mergeMap,
  of,
  skip,
  switchMap,
} from 'rxjs';
import { ProductService, StorageService } from '@stockeer/services';
import { addProduct, AppState, removeProduct } from '..';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { getStoragesDict } from './storages.selectors';
import {
  addProductSuccess,
  removeProductSuccess,
} from '../products/products.actions';
import { ProductDto, StorageDto } from '@stockeer/dtos';
import { Unit } from '@stockeer/types';

@Injectable()
export class StorageEffects {
  readonly ensureLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ensureStoragesLoaded),
      exhaustMap(() => {
        return this.service.load().pipe(
          map((storages) => loadStoragesSuccess({ storages })),
          catchError(() => {
            return [];
          })
        );
      }),
      exhaustMap((prevActions) => {
        return this.service.loadStockeerSelection().pipe(
          switchMap((storageIds) =>
            from([setStorageSelection({ storageIds }), prevActions])
          ),
          catchError(() => of(prevActions))
        );
      })
    )
  );

  readonly addStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStorage),
      mergeMap((action) => {
        const stockeer = { id: uuid(), name: action.name, products: [] };

        return this.service.setStockeer(stockeer).pipe(
          map((dto) =>
            setStorageSuccess({
              storage: dto,
            })
          )
        );
      })
    )
  );

  readonly removeStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeStorage),
      concatLatestFrom(() => this.store.select(getStoragesDict)),
      mergeMap(([action, entities]) => {
        const storage = entities[action.storageId];
        if (!storage) return EMPTY;

        const ids: ReadonlyArray<string> = storage.products;
        return of(
          removeStorageSuccess({ storageId: action.storageId }),
          ...ids.map((id) => removeProductSuccess({ productId: id }))
        );
      })
    )
  );

  readonly addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      concatLatestFrom(() => this.store.select(getStoragesDict)),
      mergeMap(([action, entities]) => {
        const storage = entities[action.storageId];
        if (!storage) return EMPTY;

        // TODO: Expiry und Quantity korrekt setzen
        const newProduct: ProductDto = {
          id: uuid(),
          name: action.name,
          storageId: action.storageId,
          quantity: { amount: 1, unit: Unit.PIECE },
          expiryDate: new Date().toISOString(),
          barcode: '',
        };

        const newStorage: StorageDto = {
          ...storage,
          products: storage.products.concat(newProduct.id),
        };

        return this.productService
          .setProduct(newProduct)
          .pipe(
            switchMap(() => [
              setStorageSuccess({ storage: newStorage }),
              addProductSuccess({ product: newProduct }),
            ])
          );
      })
    )
  );

  readonly removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProduct),
      concatLatestFrom(() => this.store.select(getStoragesDict)),
      mergeMap(([action, entities]) => {
        const storage = entities[action.storageId];
        if (!storage) return EMPTY;

        const newStorage: StorageDto = {
          ...storage,
          products: storage.products.filter((id) => id !== action.productId),
        };

        return this.productService
          .removeProduct(action.productId)
          .pipe(
            switchMap(() => [
              setStorageSuccess({ storage: newStorage }),
              removeProductSuccess({ productId: action.productId }),
            ])
          );
      })
    )
  );

  readonly test$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setStorageSelection),
        skip(1),
        switchMap(({ storageIds }) =>
          this.service.saveStockeerSelection(storageIds)
        )
      ),
    { dispatch: false }
  );

  constructor(
    protected readonly actions$: Actions,
    protected readonly store: Store<AppState>,
    protected readonly service: StorageService,
    protected readonly productService: ProductService
  ) {}
}
