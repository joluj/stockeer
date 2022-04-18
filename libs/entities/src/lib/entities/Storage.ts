import { Product } from './Product';

export interface Storage {
  id: string;
  name: string;
  products: Product[];
}
