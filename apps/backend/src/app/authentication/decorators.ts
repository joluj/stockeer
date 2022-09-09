import {
  createParamDecorator,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { IncomingMessage } from 'http';
import { JwtPayloadDto } from '@stockeer/dtos';
import { runtimeValidationPipe } from './shared/pipes';
import { UserRole } from '@stockeer/types';

export const ROLES_KEY = 'roles';
/**
 * Mit diesem Decorator kann definiert werden, welche Rollen einen gewissen Endpunkt aufrufen können.
 * Wird ein Endpunkt ohne diesen Decorator definiert, dann kann dieser von jeder Rolle verwendet werden.
 * @param roles
 * @constructor
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Der JWT Guard wird global definiert. Insofern muss man diesen Decorator für Routes verwenden,
 * die nicht nur mit gültigem JWT aufgerufen werden sollen.
 * @constructor
 */
export const PublicJWT = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Holt das JWT Payload aus einer Request heraus und macht dabei auch eine Typprüfung.
 */
export const SessionUserPayload = createParamDecorator(
  async (data, req: ExecutionContextHost) => {
    console.log(data);
    const user = req.getArgs().find((x) => x instanceof IncomingMessage).user;
    if (user) {
      return (await runtimeValidationPipe(
        user,
        JwtPayloadDto
      )) as JwtPayloadDto;
    }
    throw new UnauthorizedException();
  }
);
