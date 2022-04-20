import { IsInt, IsString } from 'class-validator';
import { IErrorResponse } from '@stockeer/types';

export class ErrorResponseDto implements IErrorResponse {
  @IsInt()
  statusCode!: number;
  @IsString()
  message!: string;
  @IsString()
  error!: string;
}
