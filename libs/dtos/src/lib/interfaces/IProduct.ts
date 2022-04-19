import { Mutable } from 'utility-types';

export interface IProduct {
  readonly id: string;
  readonly name: string;
}

export type IProductMutable = Mutable<IProduct>;
