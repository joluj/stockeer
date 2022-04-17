import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '@stockeer/dtos';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  load(): Observable<IProduct[]> {
    return of([]);
  }
}
