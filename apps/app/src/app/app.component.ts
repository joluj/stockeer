import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  ensureProductsLoaded,
  ensureStoragesLoaded,
  getStorages,
} from '@stockeer/store';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '@stockeer/services';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'stockeer-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly storages$ = this.store.select(getStorages);

  constructor(
    private readonly store: Store<AppState>,
    private readonly storage: Storage,
    private readonly authService: AuthService
  ) {}

  async ngOnInit() {
    // TODO Move this into service module
    this.storage.create().then(async () => {
      await lastValueFrom(this.authService.authenticate(), {
        defaultValue: null,
      });

      this.store.dispatch(ensureProductsLoaded());
      this.store.dispatch(ensureStoragesLoaded());
    });
  }
}
