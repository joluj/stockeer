import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './item-overview.component.html',
  styleUrls: ['./item-overview.component.scss'],
})
export class ItemOverviewComponent {
  @Input()
  items: string[];

  @Output()
  delete: EventEmitter<boolean>;

  constructor() {
    this.items = ['Mango', 'Johannes'];
    this.delete = new EventEmitter();
  }

  onDeleteClick() {
    this.delete.emit(true);
  }
}
