import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  imports: [CommonModule, IonicStorageModule.forRoot()],
  providers: [AndroidPermissions],
})
export class ServicesModule {}
