import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [AddProductComponent],
  exports: [AddProductComponent],
})
export class AddProductModule {}
