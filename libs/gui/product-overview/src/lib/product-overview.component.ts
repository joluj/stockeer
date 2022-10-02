import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/store';
import { listAnimation } from '@stockeer/gui/ui-components';

@Component({
  selector: 'stockeer-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
  animations: [listAnimation],
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

  trackBy(index: number, item: Product) {
    return item.id;
  }
}
