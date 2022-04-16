import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ProductItemComponent],
  exports: [ProductItemComponent],
})
export class ProductItemModule {}
