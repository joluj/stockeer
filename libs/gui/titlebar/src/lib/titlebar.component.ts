import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'stockeer-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  @Output()
  logout: EventEmitter<void>;

  constructor() {
    // Make sure to initialize the variables in the constructor
    // Reason: https://github.com/storybookjs/storybook/issues/17004
    // TLDR: storybook bug
    this.logout = new EventEmitter();
  }

  triggerLogout() {
    this.logout.emit();
  }
}
