import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, Unit } from '@stockeer/types';

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  product?: IProduct;

  /**
   * Emits an empty event when the delete-button is clicked.
   */
  @Output()
  delete: EventEmitter<void>;

  constructor() {
    this.delete = new EventEmitter();
  }

  ngOnInit(): void {
    this.product = this.product ?? {
      id: '0',
      name: 'Product',
      expiryDate: '2022-04-16',
      quantity: { amount: 1, unit: Unit.PIECE },
      storageId: '0',
    };
  }
}
