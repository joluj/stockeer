import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { PublicJWT } from './authentication/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicJWT()
  @Get()
  getData() {
    return this.appService.getData();
  }
}
