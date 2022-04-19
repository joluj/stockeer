import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { LocalStrategy } from './startegies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
import { JwtStrategy } from './startegies/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@stockeer/entities';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: environment.authentication.jwtSecret,
      signOptions: { expiresIn: environment.authentication.jwtExpiration },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
  constructor(private authService: AuthService) {
    this.createAdminUser();
  }

  async createAdminUser() {
    if (
      environment.adminAccount.username &&
      environment.adminAccount.password &&
      (await this.authService.findRegisteredByUsername(
        environment.adminAccount.username
      )) == undefined
    ) {
      await this.authService.createAdminUser(
        environment.adminAccount.username,
        environment.adminAccount.password
      );
    }
  }
}
