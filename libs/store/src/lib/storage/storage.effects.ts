import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ensureStoragesLoaded, loadStoragesSuccess } from './storage.actions';
import { exhaustMap, of } from 'rxjs';

@Injectable()
export class StorageEffects {
  readonly ensureLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ensureStoragesLoaded),
      exhaustMap(() => {
        // TODO call service
        return of(loadStoragesSuccess({ storages: [] }));
      })
    )
  );

  constructor(protected readonly actions$: Actions) {}
}
