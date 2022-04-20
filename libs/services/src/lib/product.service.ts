import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '@stockeer/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  load(): Observable<IProduct[]> {
    return of([]);
  }
}
