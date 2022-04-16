import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview.component';
import { IonicModule } from '@ionic/angular';
import { ProductItemModule } from '@stockeer/gui/product-item';

@NgModule({
  imports: [CommonModule, IonicModule, ProductItemModule],
  declarations: [ProductOverviewComponent],
  exports: [ProductOverviewComponent],
})
export class ProductOverviewModule {}
