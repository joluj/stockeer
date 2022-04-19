import { IsEnum, IsInt, IsString } from 'class-validator';
import { IJwtPayload, UserRole } from '../interfaces';

export class JwtPayloadDto implements IJwtPayload {
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
