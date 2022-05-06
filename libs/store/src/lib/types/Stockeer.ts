import { StorageDto } from '@stockeer/dtos';
import { DeepReadonly } from 'utility-types';
import { Product } from './Product';

type Base = Omit<StorageDto, 'products'>;
export class Stockeer implements DeepReadonly<Base> {
  readonly id: string;
  readonly name: string;
  readonly products: Product[];

  constructor(base: Base & { products: Product[] }) {
    this.id = base.id;
    this.name = base.name;
    this.products = base.products;
  }
}
