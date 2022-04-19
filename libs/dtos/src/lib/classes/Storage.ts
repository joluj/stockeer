import { IsInt, IsString } from 'class-validator';
import { IStorage } from '../interfaces';

export class StorageDto implements IStorage {
  @IsInt()
  readonly id!: string;
  @IsString()
  readonly name!: string;
  @IsString({ each: true })
  readonly products!: ReadonlyArray<string>;
}
