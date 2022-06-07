import { Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { ProductDto } from '@stockeer/dtos';
import { Storage } from '@ionic/storage-angular';
import { Serialized } from '@stockeer/types';

/**
 * Prefix for products
 */
const STORAGE_PRODUCT_PREFIX = 'PRODUCT_';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly storage: Storage) {}

  /**
   * Loads data from storage and server.
   *
   * TODO: Make it also load from the server.
   */
  load(): Observable<ProductDto[]> {
    return this.loadFromStorage();
  }

  /**
   * Loads data from the local storage
   */
  protected loadFromStorage(): Observable<Serialized<ProductDto>[]> {
    return defer(() =>
      from(
        (async () => {
          // contains all keys containing a storage object
          const keys = (await this.storage.keys()).filter((key) =>
            key.startsWith(STORAGE_PRODUCT_PREFIX)
          );

          // noinspection UnnecessaryLocalVariableJS
          const products = Promise.all(
            keys.map((key) => this.storage.get(key))
          );

          return products;
        })()
      )
    );
  }

  public setProduct(
    product: Serialized<Omit<ProductDto, 'storageId'>>
  ): Observable<void> {
    return defer(() =>
      from(this.storage.set(STORAGE_PRODUCT_PREFIX + product.id, product))
    );
  }

  public removeProduct(id: ProductDto['id']): Observable<void> {
    return defer(() => from(this.storage.remove(STORAGE_PRODUCT_PREFIX + id)));
  }
}
