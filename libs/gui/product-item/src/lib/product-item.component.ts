import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../../../shared/src/lib/entities/Product";

@Component({
  selector: 'stockeer-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: Product

  @Output()
  onDelete: EventEmitter<Event>

  constructor() {
    this.product = {
      id: 0,
      name: 'Banana',
      bestBeforeDate: new Date(2022, 10, 2),
    }
    this.onDelete = new EventEmitter()
  }
}
