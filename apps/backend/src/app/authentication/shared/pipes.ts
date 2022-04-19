/**
 * Runs the global ValidationPipe but allows runtime transformation and
 * validation type configuration.
 *
 * @example
 * const entity: EntityClass = ...;
 * await pipes(entity, EntityClass);
 */
import {
  ParseArrayPipe,
  PipeTransform,
  Type,
  ValidationPipe,
} from '@nestjs/common';

const parseArrayPipe = new ParseArrayPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
});

const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
});

export const globalPipes: PipeTransform<unknown, unknown>[] = [validationPipe];

export function runtimeValidationPipe<T>(entity: T, type: Type<T>) {
  return validationPipe.transform(entity, { metatype: type, type: 'body' });
}

export function runtimeParseArray<T>(arr: T[], type: Type<T>) {
  return parseArrayPipe.transform(arr, { metatype: type, type: 'body' });
}
