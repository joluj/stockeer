import { IsInt, IsString } from 'class-validator';

export class ErrorResponseDto {
  @IsInt()
  statusCode!: number;
  @IsString()
  message!: string;
  @IsString()
  error!: string;
}
