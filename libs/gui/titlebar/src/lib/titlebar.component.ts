import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Stockeer } from '@stockeer/store';
import { SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'stockeer-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  @Input()
  stockeers$: Observable<Stockeer[]>;

  @Input()
  selection$: Observable<Stockeer[]>;

  @Output()
  logout: EventEmitter<void>;

  @Output()
  selectionChanged: EventEmitter<string[]>;

  constructor() {
    // Make sure to initialize the variables in the constructor
    // Reason: https://github.com/storybookjs/storybook/issues/17004
    // TLDR: storybook bug
    this.logout = new EventEmitter();
    this.selectionChanged = new EventEmitter();
    this.stockeers$ = EMPTY;
    this.selection$ = EMPTY;
  }

  triggerLogout() {
    this.logout.emit();
  }

  compare(a: Stockeer, b: Stockeer) {
    return a.id === b.id;
  }

  changed(event: SelectCustomEvent) {
    this.selectionChanged.emit(
      (event.detail.value as Stockeer[]).map((s) => s.id)
    );
  }
}
