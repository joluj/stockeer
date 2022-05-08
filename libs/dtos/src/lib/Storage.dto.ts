import { IsInt, IsString } from 'class-validator';

export class StorageDto {
  @IsInt()
  readonly id!: string;
  @IsString()
  readonly name!: string;
  @IsString({ each: true })
  readonly products!: ReadonlyArray<string>;
}
