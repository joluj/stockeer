import { IsString } from 'class-validator';
import { IJwtResponse } from '@stockeer/types';

export class JwtResponseDto implements IJwtResponse {
  @IsString()
  accessToken!: string;
}
