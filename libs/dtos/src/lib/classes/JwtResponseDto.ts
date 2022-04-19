import { IsString } from 'class-validator';
import { IJwtResponse } from '../interfaces';

export class JwtResponseDto implements IJwtResponse {
  @IsString()
  accessToken!: string;
}
