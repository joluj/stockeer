import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
