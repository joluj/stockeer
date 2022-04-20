import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IProduct, IQuantity, Unit } from '@stockeer/types';
import { Type } from 'class-transformer';

export class QuantityDto implements IQuantity {
  @IsNumber()
  amount!: number;
  @IsEnum(Unit)
  unit!: Unit;
}

/**
 * Concrete Class that implements the Product Interface. Is required to make use of decorators for Backend Validation.
 */
export class ProductDto implements IProduct {
  @IsInt()
  readonly id!: string;
  @IsString()
  readonly name!: string;
  @IsString()
  expiryDate!: string;
  @ValidateNested()
  @Type(() => QuantityDto)
  quantity!: QuantityDto;
  @IsString()
  storageId!: string;
}
