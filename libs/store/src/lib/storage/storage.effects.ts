import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ensureStoragesLoaded, loadStoragesSuccess } from './storage.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { StorageService } from '@stockeer/services';

@Injectable()
export class StorageEffects {
  readonly ensureLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ensureStoragesLoaded),
      exhaustMap(() => {
        return this.service.load().pipe(
          map((storages) => loadStoragesSuccess({ storages })),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  constructor(
    protected readonly actions$: Actions,
    protected readonly service: StorageService
  ) {}
}
