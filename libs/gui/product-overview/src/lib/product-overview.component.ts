import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/entities';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  @Input()
  products: Product[];

  /**
   * Emits the id of the product clicked on.
   */
  @Output()
  delete: EventEmitter<string>;

  constructor() {
    this.products = [];
    this.delete = new EventEmitter();
  }
}
