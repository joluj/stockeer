import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOverviewComponent } from './item-overview.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ItemOverviewComponent],
  exports: [ItemOverviewComponent],
})
export class GuiItemOverviewModule {}
