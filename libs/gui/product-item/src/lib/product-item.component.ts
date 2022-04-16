import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/shared';

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: Product | null;

  @Output()
  /**
   * Emits an empty event when the delete-button is clicked.
   */
  delete: EventEmitter<void>;

  constructor() {
    this.product = null;
    this.delete = new EventEmitter();
  }
}
