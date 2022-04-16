import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/shared';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  @Input()
  products: Product[];

  @Output()
  /**
    * Emits the id of the product clicked on
    */
  delete: EventEmitter<string>;

  constructor() {
    this.products = [
      {
        id: '0',
        name: 'Banana',
        bestBeforeDate: '2022-04-16',
      },
    ];
    this.onDelete = new EventEmitter();
  }
}
