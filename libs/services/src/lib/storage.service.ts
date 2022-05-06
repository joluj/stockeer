import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageDto } from '@stockeer/dtos';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  load(): Observable<StorageDto[]> {
    return of([]);
  }
}
