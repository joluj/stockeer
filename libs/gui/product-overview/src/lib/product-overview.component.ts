import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/src/lib/entities/Product';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  @Input()
  products: Product[];

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onDelete: EventEmitter<number>;

  constructor() {
    this.products = [
      {
        id: 0,
        name: 'Banana',
        bestBeforeDate: new Date(2022, 10, 2),
      },
    ];
    this.onDelete = new EventEmitter();
  }
}
