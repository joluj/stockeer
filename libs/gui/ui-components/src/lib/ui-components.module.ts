import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHeightComponent } from './smooth-height/smooth-height.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [SmoothHeightComponent],
  exports: [SmoothHeightComponent],
})
export class UiComponentsModule {}
