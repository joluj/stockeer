import { IsEnum, IsInt, IsString } from 'class-validator';
import { UserRole } from '@stockeer/types';

export class JwtPayloadDto {
  @IsInt()
  sub!: number;
  @IsEnum(UserRole)
  role!: UserRole;
  @IsString()
  username!: string;
  @IsInt()
  iat!: number;
  @IsInt()
  exp!: number;
}
