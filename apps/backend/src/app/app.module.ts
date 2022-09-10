import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './authentication/auth.module';
import { environment } from '../environments/environment';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { RolesGuard } from './authentication/guards/role.guard';
import { ThrottlerBehindProxyGuard } from './authentication/shared/throttle-behind-proxy-guard';
import { GlobalExceptionFilter } from './exceptions/global-exception-filter';
import { StockeerModule } from './stockeer/stockeer.module';
import { ProductModule } from './products/product.module';
import { BarcodeModule } from './barcode/barcode.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: environment.globalThrottleTtl,
      limit: environment.globalThrottleLimit,
    }),
    StockeerModule,
    ProductModule,
    BarcodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      /**
       * Every endpoint will be guarded by the JwtAuthGuard. This means that you need a valid Jwt to access any endpoint by default. This can be prevented by
       * decoration individual endpoints with the @PublicJWT decorator. One example is the login endpoint, where the user obivously cannot yet have a valid JWT!
       */
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      /**
       * Every endpoint will be guarded by the Roles guard. It reads the required roles for every endpoint set by the @Roles decorator and checks if the
       * currently authenticated user has any of the required roles.
       */
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      /**
       * Every endpoint will be guarded by the throttle guard. Can be overwritten with the @Throttle decorator for individual endpoints.
       */

      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      /**
       * Provides a Exception filter for every endpoint. Translates errors to meaningful responses to the frontend.
       */
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
