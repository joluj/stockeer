import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@stockeer/shared';

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: Product;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onDelete: EventEmitter<void>;

  constructor() {
    this.product = {
      id: '0',
      name: 'Banana',
      bestBeforeDate: '2022-04-16',
    };
    this.onDelete = new EventEmitter();
  }
}
