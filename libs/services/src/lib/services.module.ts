import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [CommonModule, IonicStorageModule.forRoot()],
})
export class ServicesModule {}
