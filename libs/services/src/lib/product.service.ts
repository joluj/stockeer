import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductDto } from '@stockeer/dtos';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  load(): Observable<ProductDto[]> {
    return of([]);
  }
}
