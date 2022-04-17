import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { productsReducer } from './products/products.reducer';
import { ProductsEffects } from './products/products.effects';
import { StorageEffects } from './storage/storage.effects';
import { storagesReducer } from './storage/storages.reducer';

export const StoreModuleImports: ModuleWithProviders<object>[] = [
  StoreModule.forRoot<AppState>({
    products: productsReducer,
    storages: storagesReducer,
  }),
  EffectsModule.forRoot([ProductsEffects, StorageEffects]),
];

@NgModule({
  imports: [...StoreModuleImports],
})
export class AppStoreModule {}
