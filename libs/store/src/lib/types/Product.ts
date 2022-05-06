import { DeepReadonly } from 'utility-types';
import { ProductDto, QuantityDto } from '@stockeer/dtos';

type Base = Omit<ProductDto, 'storageId'>;
export class Product implements DeepReadonly<Base> {
  readonly expiryDate: string;
  readonly id: string;
  readonly name: string;
  readonly quantity: QuantityDto;

  constructor(base: Base) {
    this.expiryDate = base.expiryDate;
    this.id = base.id;
    this.name = base.name;
    this.quantity = base.quantity;
  }
}
