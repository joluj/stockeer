import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ProductOverviewComponent],
  exports: [ProductOverviewComponent],
})
export class GuiProductOverviewModule {}
