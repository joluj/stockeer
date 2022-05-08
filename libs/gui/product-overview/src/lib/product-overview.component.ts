import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/store';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  private productsInstance?: Product[];

  @Input()
  set products(value: Product[]) {
    this.productsInstance = value;
  }

  get products(): Product[] {
    return this.productsInstance ?? [];
  }

  /**
   * Emits the id of the product clicked on.
   */
  @Output()
  delete: EventEmitter<string>;

  constructor() {
    this.delete = new EventEmitter();
  }
}
