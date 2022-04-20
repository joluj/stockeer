import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStorage } from '@stockeer/types';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  load(): Observable<IStorage[]> {
    return of([]);
  }
}
