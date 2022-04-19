import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { BusinessLogicException } from '../../exceptions/business-logic-exception';
import { UserEntity } from '@stockeer/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BusinessLogicException(
        'Benutzername oder Passwort ist falsch.'
      );
    }
    return user;
  }
}
