import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addStorage,
  AppState,
  ensureProductsLoaded,
  ensureStoragesLoaded,
  getSelectedStorages,
  getStorages,
  setStorageSelection,
} from '@stockeer/store';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '@stockeer/services';
import { BehaviorSubject, finalize, first, Observable } from 'rxjs';
import { AuthProps } from '@stockeer/gui/auth';
import { fadeInOut } from '@stockeer/gui/ui-components';

@Component({
  selector: 'stockeer-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeInOut],
})
export class AppComponent implements OnInit {
  readonly stockeers$ = this.store.select(getStorages);
  readonly stockeerSelection$ = this.store.select(getSelectedStorages);

  isLoggedIn$?: Observable<boolean>;

  authenticationInProgress$ = new BehaviorSubject(true);

  constructor(
    private readonly store: Store<AppState>,
    private readonly storage: Storage,
    private readonly authService: AuthService
  ) {}

  async ngOnInit() {
    this.authenticationInProgress$.next(true);
    this.isLoggedIn$ = this.authService.authenticated;

    this.authService.authenticated
      .pipe(first((authenticated) => authenticated))
      .subscribe(() => {
        this.store.dispatch(ensureProductsLoaded());
        this.store.dispatch(ensureStoragesLoaded());
      });

    await this.storage.create();
    await this.authService.validateAuthentication();
    this.authenticationInProgress$.next(false);
  }

  async triggerLogout() {
    await this.authService.logout();
  }

  triggerLogin({ password, username, action }: AuthProps) {
    if (action === 'register') {
      window.alert('Registration is not yet supported');
      return;
    }

    this.authenticationInProgress$.next(true);
    this.authService
      .authenticate({ username, password })
      .pipe(
        finalize(() => {
          this.authenticationInProgress$.next(false);
        })
      )
      .subscribe();
  }

  triggerStockeerSelectionChanged(storageIds: string[]) {
    this.store.dispatch(setStorageSelection({ storageIds }));
  }

  triggerNewStockeer() {
    const name = window.prompt('New Stockeer');
    if (!name) return;

    this.store.dispatch(addStorage({ name }));
  }
}
