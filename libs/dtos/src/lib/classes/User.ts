import { IUser, UserRole } from '../interfaces';
import { IsDate, IsEnum, IsInt, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto implements IUser {
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
