import { Injectable } from '@angular/core';
import { catchError, defer, from, Observable, switchMap } from 'rxjs';
import { ProductDto, SetProductDto } from '@stockeer/dtos';
import { Storage } from '@ionic/storage-angular';
import { Serialized } from '@stockeer/types';
import { HttpClient } from '@angular/common/http';

/**
 * Prefix for products
 */
const STORAGE_PRODUCT_PREFIX = 'PRODUCT_';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly storage: Storage,
    private readonly http: HttpClient
  ) {}

  /**
   * Loads data from storage and server.
   *
   * TODO: Use local storage first
   */
  load(): Observable<ProductDto[]> {
    return this.http.get<Serialized<ProductDto>[]>('/api/products').pipe(
      catchError(() => {
        return this.loadFromStorage();
      })
    );
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
    product: Serialized<SetProductDto>
  ): Observable<Serialized<ProductDto>> {
    return defer(() =>
      from(this.storage.set(STORAGE_PRODUCT_PREFIX + product.id, product)).pipe(
        switchMap(() =>
          this.http.put<Serialized<ProductDto>>('/api/products', product)
        )
      )
    );
  }

  public removeProduct(id: ProductDto['id']): Observable<void> {
    return defer(() => from(this.storage.remove(STORAGE_PRODUCT_PREFIX + id)));
  }
}
