import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unit } from '@stockeer/types';
import { Product } from '@stockeer/store';

type ProductWithoutStorageInfo = Omit<Product, 'storageId'>;

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  private productInstance?: ProductWithoutStorageInfo;

  @Input()
  set product(value: ProductWithoutStorageInfo) {
    this.productInstance = value;
  }

  get product(): ProductWithoutStorageInfo {
    return (
      this.productInstance ?? {
        id: '0',
        name: 'Product',
        expiryDate: '2022-04-16',
        quantity: { amount: 1, unit: Unit.PIECE },
        barcode: '',
      }
    );
  }

  /**
   * Emits an empty event when the delete-button is clicked.
   */
  @Output()
  delete: EventEmitter<void>;

  constructor() {
    this.delete = new EventEmitter();
  }
}
