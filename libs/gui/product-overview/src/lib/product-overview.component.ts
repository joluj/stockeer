import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '@stockeer/types';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  productsInstance?: IProduct[];

  @Input()
  set products(value: IProduct[]) {
    this.productsInstance = value;
  }

  get products(): IProduct[] {
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
