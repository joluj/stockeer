import { IsInt, IsString } from 'class-validator';
import { IProduct } from '../interfaces';

/**
 * Concrete Class that implements the Product Interface. Is required to make use of decorators for Backend Validation.
 */
export class ProductDto implements IProduct {
  @IsInt()
  readonly id!: string;
  @IsString()
  readonly name!: string;
}
