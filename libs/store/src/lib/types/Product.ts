import { DeepReadonly, Optional } from 'utility-types';
import { ProductDto, QuantityDto } from '@stockeer/dtos';

type Base = ProductDto;

export class Product implements DeepReadonly<Base> {
  readonly expiryDate: string;
  readonly id: string;
  readonly name: string;
  readonly quantity: QuantityDto;
  readonly barcode: string;
  readonly storageId: string;

  constructor(base: Optional<Base, 'barcode'>) {
    this.expiryDate = base.expiryDate;
    this.id = base.id;
    this.name = base.name;
    this.quantity = base.quantity;
    this.barcode = base.barcode ?? '';
    this.storageId = base.storageId ?? '';
  }
}
