import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Unit } from '@stockeer/entities';

export type ProductOptionalId = Omit<Product, 'id'> & { id?: string };

@Component({
  selector: 'stockeer-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  /**
   * Specifies if this component acts as an add-component,
   * or as an edit-component.
   */
  @Input()
  add: boolean;

  /**
   * If {@link add} is true, this product is null, otherwise
   * it contains the product that may be edited.
   */
  @Input()
  product?: ProductOptionalId;

  /**
   * Emits the product created from the input-values.
   * If {@link add} is true, the id is not specified (add case).
   * Otherwise, the product emitted holds the id of the
   * input {@link product} (edit case).
   */
  @Output()
  addEditEmitter: EventEmitter<ProductOptionalId>;

  constructor() {
    this.add = true;
    this.addEditEmitter = new EventEmitter();
    this.product = this.product ?? {
      name: '',
      expiryDate: '',
      quantity: { amount: 1, unit: Unit.PIECE },
    };
  }

  emitProduct() {
    this.addEditEmitter.emit({ ...this.product });
  }
}
