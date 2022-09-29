import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@stockeer/gui/ui-components';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, UiComponentsModule],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
