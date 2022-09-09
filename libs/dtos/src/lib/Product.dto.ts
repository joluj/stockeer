import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Unit } from '@stockeer/types';

/**
 * Defines an amount given in the specified unit.
 */
export class QuantityDto {
  @IsNumber()
  amount!: number;
  @IsEnum(Unit)
  unit!: Unit;
}

/**
 * Concrete Class that implements the Product Interface. Is required to make use of decorators for Backend Validation.
 */
export class SetProductDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  readonly name!: string;

  /**
   * Expiry date as ISO string representation of a Date.
   *
   * @example:
   *  myProduct.date = new Date().toISOString();
   * "2022-04-16T11:07:55.879Z"
   */
  @IsString()
  expiryDate!: string;

  @ValidateNested()
  @Type(() => QuantityDto)
  quantity!: QuantityDto;

  @IsString()
  storageId!: string;

  @IsString()
  barcode!: string;
}

export class ProductDto extends SetProductDto {
  @IsUUID()
  override id!: string;
}
