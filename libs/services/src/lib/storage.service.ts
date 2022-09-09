import { Injectable } from '@angular/core';
import { catchError, defer, from, Observable, switchMap } from 'rxjs';
import { SetStorageDto, StorageDto } from '@stockeer/dtos';
import { Serialized } from '@stockeer/types';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Prefix for stockeers
 */
const STORAGE_STOCKEER_PREFIX = 'STOCKEER_';

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
          const keys = (await this.storage.keys()).filter((key) =>
            key.startsWith(STORAGE_STOCKEER_PREFIX)
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
