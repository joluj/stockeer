import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview.component';
import { IonicModule } from '@ionic/angular';
import { GuiProductItemModule } from '@stockeer/gui/product-item';

@NgModule({
  imports: [CommonModule, IonicModule, GuiProductItemModule],
  declarations: [ProductOverviewComponent],
  exports: [ProductOverviewComponent],
})
export class GuiProductOverviewModule {}
