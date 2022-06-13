import { Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { StorageDto } from '@stockeer/dtos';
import { Serialized } from '@stockeer/types';
import { Storage } from '@ionic/storage-angular';

/**
 * Prefix for stockeers
 */
const STORAGE_STOCKEER_PREFIX = 'STOCKEER_';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly storage: Storage) {}

  /**
   * Loads data from storage and server.
   *
   * TODO: Make it also load from the server.
   */
  load(): Observable<StorageDto[]> {
    return this.loadFromStorage();
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

  public setStockeer(stockeer: Serialized<StorageDto>): Observable<void> {
    return defer(() =>
      from(this.storage.set(STORAGE_STOCKEER_PREFIX + stockeer.id, stockeer))
    );
  }

  public removeStockeer(id: StorageDto['id']): Observable<void> {
    return defer(() => from(this.storage.remove(STORAGE_STOCKEER_PREFIX + id)));
  }
}
