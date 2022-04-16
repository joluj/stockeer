export interface Product {
  id: string;
  name: string;
  /**
   * ISO string representation of a Date.
   *
   * @example:
   *  myProduct.date = new Date().toISOString();
   * "2022-04-16T11:07:55.879Z"
   */
  bestBeforeDate: string;
}
