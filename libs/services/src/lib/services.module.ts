import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, IonicStorageModule.forRoot(), HttpClientModule],
  providers: [AndroidPermissions],
})
export class ServicesModule {}
