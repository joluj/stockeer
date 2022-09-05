import { Injectable } from '@angular/core';
import { ReducerManager, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Stockeer } from '../types';
import { HttpClient } from '@angular/common/http';
import { FetchPipelineBuilder } from '../FetchService/FetchPipelineBuilder';
import { map } from 'rxjs';
import { FetchReducerManager } from '../FetchService/FetchReducerManager';
import { FetchInfo$ } from '../fetch.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly getSinglePipeline = FetchPipelineBuilder.Create(
    'Stockeers | Get',
    'stockeers',
    this.store,
    new FetchReducerManager(this.reducerManager)
  )
    .addLoadingBlock()
    .addEntitiesSuccessBlock((e) => e.id)
    .addErrorBlock()
    .addFetchMethod(({ ids }) => {
      return this.http
        .get<Stockeer>(`http://localhost:3333/api/stockeers/${ids[0]}`)
        .pipe(map((s) => ({ entities: [s] })));
    });

  readonly getAllPipeline = FetchPipelineBuilder.Create(
    'Stockeers | All',
    'stockeers',
    this.store,
    new FetchReducerManager(this.reducerManager)
  )
    .addLoadingBlock()
    .addEntitiesSuccessBlock(() => 'all')
    .addErrorBlock()
    .addFetchMethod(() => {
      return this.http
        .get<Stockeer[]>(`http://localhost:3333/api/stockeers`)
        .pipe(map((s) => ({ entities: s })));
    });

  constructor(
    private readonly store: Store<AppState>,
    private readonly reducerManager: ReducerManager,
    private readonly http: HttpClient
  ) {}

  get$(id: string): FetchInfo$<Stockeer> {
    return this.getSinglePipeline.triggerAndConvert$(
      { ids: [id] },
      id,
      (state) => state.stockeers.entities[id]
    );
  }

  getAll$(): FetchInfo$<string[]> {
    return this.getAllPipeline.triggerAndConvert$(
      { ids: ['all'] },
      'all',
      (state) => state.stockeers.all
    );
  }
}
