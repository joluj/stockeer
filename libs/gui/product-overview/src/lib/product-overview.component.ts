import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '@stockeer/types';

@Component({
  selector: 'stockeer-item-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  @Input()
  products?: IProduct[];

  /**
   * Emits the id of the product clicked on.
   */
  @Output()
  delete: EventEmitter<string>;

  constructor() {
    this.delete = new EventEmitter();
  }

  ngOnInit(): void {
    this.products = this.products ?? [];
  }
}
