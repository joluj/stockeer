import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FetchServiceClass } from '../fetch.service';
import { Stockeer } from '../types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const {
  Service,
  reducer: StockeerReducer,
  actions: StockeerActions,
} = FetchServiceClass({
  getId: (e: Stockeer) => e.id,
  initialState: {},
  reducerPath: 'stockeers',
});

@Injectable({ providedIn: 'root' })
export class StorageService extends Service {
  constructor(store: Store<AppState>, private readonly http: HttpClient) {
    super(store);
  }

  load$(entity: string): Observable<Stockeer> {
    return this.http.get<Stockeer>(
      `http://localhost:3333/api/stockeers/${entity}`
    );
  }
}
