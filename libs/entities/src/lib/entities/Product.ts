export enum Unit {
  PIECE = 'PIECE',
  KG = 'KG',
  ML = 'ML',
}

/**
 * Defines an amount given in the specified unit.
 */
export type Quantity = { amount: number; unit: Unit };

export interface Product {
  id: string;
  name: string;

  /**
   * Expiry date as ISO string representation of a Date.
   *
   * @example:
   *  myProduct.date = new Date().toISOString();
   * "2022-04-16T11:07:55.879Z"
   */
  expiryDate: string;

  /**
   * Indicates which quantity of this product is available.
   */
  quantity: Quantity;
}
