import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BusinessLogicException } from './business-logic-exception';

import { QueryFailedError } from 'typeorm';
import { ErrorResponseDto } from '@stockeer/dtos';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error('Caught error: ' + exception);

    console.log(exception);

    let errorResponse: ErrorResponseDto;
    if (exception instanceof HttpException) {
      errorResponse = {
        statusCode: exception.getStatus(),
        error: exception.name,
        message: exception.message,
      };
      //super.catch(exception, host);
      //return;
    } else if (exception instanceof BusinessLogicException) {
      errorResponse = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'An error occurred while processing the request.',
        message: exception.message,
      };
    } else if (exception instanceof QueryFailedError) {
      errorResponse = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'An error ocurred while processing the request.',
        message: 'Database constraints were not fulfilled.',
      };
    } else {
      errorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'An unknown error has occurred.',
      };
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
