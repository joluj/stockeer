import { IsOptional, IsString, IsUUID } from 'class-validator';

export class StorageDto {
  @IsUUID()
  readonly id!: string;

  @IsString()
  readonly name!: string;

  @IsString({ each: true })
  readonly products!: ReadonlyArray<string>;
}

export class SetStorageDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  readonly name!: string;
}
