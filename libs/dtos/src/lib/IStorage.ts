import { Mutable } from 'utility-types';

export interface IStorage {
  readonly name: string;
  /**
   * Product ids
   */
  readonly products: ReadonlyArray<string>;
}

export type IStorageMutable = Mutable<IStorage>;
