import { Injectable } from '@angular/core';
import {
  catchError,
  defer,
  EMPTY,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { SetStorageDto, StorageDto } from '@stockeer/dtos';
import { Serialized } from '@stockeer/types';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { validate as isUuid } from 'uuid';

/**
 * Prefix for stockeers
 */
const STORAGE_STOCKEER_PREFIX = 'STOCKEER_';
const STORAGE_STOCKEER_SELECTION_KEY = STORAGE_STOCKEER_PREFIX + '_SELECTION_';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private readonly storage: Storage,
    private readonly http: HttpClient
  ) {}

  /**
   * Loads data from storage and server.
   *
   * TODO: Use local storage first
   */
  load(): Observable<StorageDto[]> {
    return this.http.get<Serialized<StorageDto>[]>('/api/stockeers').pipe(
      catchError(() => {
        return this.loadFromStorage();
      })
    );
  }

  /**
   * Loads data from the local storage
   */
  protected loadFromStorage(): Observable<Serialized<StorageDto>[]> {
    return defer(() =>
      from(
        (async () => {
          // contains all keys containing a storage object
          const keys = (await this.storage.keys()).filter(
            (key) =>
              key.startsWith(STORAGE_STOCKEER_PREFIX) &&
              isUuid(key.substring(STORAGE_STOCKEER_PREFIX.length))
          );

          // noinspection UnnecessaryLocalVariableJS
          const stockeers = Promise.all(
            keys.map((key) => this.storage.get(key))
          );

          return stockeers;
        })()
      )
    );
  }

  public loadStockeerSelection(): Observable<string[]> {
    return defer(() =>
      from(this.storage.get(STORAGE_STOCKEER_SELECTION_KEY)).pipe(
        catchError(() => EMPTY),
        map((ids) => {
          if (ids == null) {
            return [];
          }
          if (Array.isArray(ids)) {
            return ids;
          }
          console.error(`Cannot parse array of stockeers`, ids);
          return [];
        })
      )
    );
  }

  saveStockeerSelection(ids: string[]) {
    return defer(() =>
      from(this.storage.set(STORAGE_STOCKEER_SELECTION_KEY, ids)).pipe(
        catchError((e) => {
          console.error(e);
          return EMPTY;
        })
      )
    );
  }

  public setStockeer(
    stockeer: Serialized<SetStorageDto>
  ): Observable<Serialized<StorageDto>> {
    const body: SetStorageDto = { name: stockeer.name, id: stockeer.id };

    return defer(() =>
      from(
        this.storage.set(STORAGE_STOCKEER_PREFIX + stockeer.id, stockeer)
      ).pipe(switchMap(() => this.http.put<StorageDto>('/api/stockeers', body)))
    );
  }

  public removeStockeer(id: StorageDto['id']): Observable<void> {
    return defer(() => from(this.storage.remove(STORAGE_STOCKEER_PREFIX + id)));
  }
}
