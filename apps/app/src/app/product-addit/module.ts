import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageComponent } from './page.component';
import { ProductOverviewModule } from '@stockeer/gui/product-overview';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AdditProductModule } from '@stockeer/gui-addit-product';

const routes: Routes = [{ path: '', component: PageComponent }];

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductOverviewModule,
    IonicModule,
    AdditProductModule,
  ],
})
export class Module {}
