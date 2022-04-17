import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '@stockeer/entities';

@Component({
  selector: 'stockeer-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  /**
   * Emits the product created from the input-values.
   */
  @Output()
  add: EventEmitter<Product>;

  productName: string;
  expiryDate: string;

  constructor() {
    this.add = new EventEmitter();
    this.productName = '';
    this.expiryDate = '';
  }

  emitProduct() {
    const productToEmit: Product = {
      id: '1',
      name: this.productName,
      expiryDate: this.expiryDate,
    };

    this.add.emit(productToEmit);
  }
}
