import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct, Unit } from '@stockeer/types';

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: IProduct;

  /**
   * Emits an empty event when the delete-button is clicked.
   */
  @Output()
  delete: EventEmitter<void>;

  constructor() {
    this.product = {
      id: '0',
      name: 'Banana',
      expiryDate: '2022-04-16',
      quantity: { amount: 1, unit: Unit.PIECE },
      storageId: '0',
    };
    this.delete = new EventEmitter();
  }
}
