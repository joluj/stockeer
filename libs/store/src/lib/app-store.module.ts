import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { productsReducer } from './products/products.reducer';
import { ProductsEffects } from './products/products.effects';
import { StorageEffects } from './storage/storage.effects';
import { storagesReducer } from './storage/storages.reducer';
import { ServicesModule } from '@stockeer/services';
import { StockeerReducer } from './storage';
import { HttpClientModule } from '@angular/common/http';

export const StoreModuleImports: (
  | Type<object>
  | ModuleWithProviders<object>
)[] = [StoreModule, EffectsModule, ServicesModule, HttpClientModule];

export const RootStoreModuleImports = [
  StoreModule.forRoot<AppState>({
    products: productsReducer,
    storages: storagesReducer,
    stockeers: StockeerReducer,
  }),
  EffectsModule.forRoot([ProductsEffects, StorageEffects]),
  ServicesModule,
  HttpClientModule,
];

@NgModule({
  imports: [...RootStoreModuleImports],
})
export class RootStoreModule {}

@NgModule({
  imports: [...StoreModuleImports],
})
export class AppStoreModule {
  static forRoot() {
    return RootStoreModule;
  }
}
