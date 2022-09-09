import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { PublicJWT } from './decorators';
import { Throttle } from '@nestjs/throttler';
import { UserEntity } from '@stockeer/entities';
import { JwtResponseDto } from '@stockeer/dtos';

/**
 * Auth Endpoint provides functionality to login a user. The request needs to send a Json Dictionary with username and password.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicJWT()
  @UseGuards(LocalAuthGuard)
  @Throttle(10, 30)
  @Post('login')
  async login(
    @Request() req: unknown & { user: UserEntity }
  ): Promise<JwtResponseDto> {
    return this.authService.createJwt(req.user);
  }
}
