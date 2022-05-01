import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stockeer-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  @Input()
  title: string;

  @Output()
  myClick: EventEmitter<string>;

  constructor() {
    // Make sure to initialize the variables in the constructor
    // Reason: https://github.com/storybookjs/storybook/issues/17004
    // TLDR: storybook bug
    this.title = 'Stockeer';
    this.myClick = new EventEmitter();
  }

  triggerTitlebarClick() {
    this.myClick.emit('Hello from dumb component');
  }
}
