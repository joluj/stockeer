import { IsDate, IsEnum, IsInt, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '@stockeer/types';

export class UserDto {
  @IsInt()
  id!: number;
  @IsString()
  username!: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  passwordHash!: string | null;
  @IsEnum(UserRole)
  role!: UserRole;

  @IsDate()
  @Type(() => Date)
  creationTime!: Date;
  @IsDate()
  @Type(() => Date)
  editedTime!: Date;
}
