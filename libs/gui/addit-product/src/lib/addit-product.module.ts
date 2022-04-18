import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditProductComponent } from './addit-product.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [AdditProductComponent],
  exports: [AdditProductComponent],
})
export class AdditProductModule {}
