import { IsInt, IsString } from 'class-validator';
import { IErrorResponse } from '../interfaces';

export class ErrorResponseDto implements IErrorResponse {
  @IsInt()
  statusCode!: number;
  @IsString()
  message!: string;
  @IsString()
  error!: string;
}
