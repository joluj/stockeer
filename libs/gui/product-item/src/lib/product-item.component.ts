import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/entities';

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: Product;

  @Output()
  /**
   * Emits an empty event when the delete-button is clicked.
   */
  delete: EventEmitter<void>;

  constructor() {
    this.product = {
      id: '0',
      name: 'Banana',
      bestBeforeDate: '2022-04-16',
    };
    this.delete = new EventEmitter();
  }
}
