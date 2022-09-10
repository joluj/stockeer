import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { QuantityPipe } from './quantity.pipe';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [ProductItemComponent, QuantityPipe],
  exports: [ProductItemComponent, QuantityPipe],
})
export class ProductItemModule {}
