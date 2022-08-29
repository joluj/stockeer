import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { PublicJWT } from './authentication/decorators';
import { Stockeer } from '@stockeer/store';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicJWT()
  @Get()
  getData() {
    return this.appService.getData();
  }

  @PublicJWT()
  @Get('/stockeers/hello')
  get() {
    const s: Stockeer = {
      name: 'Hallo',
      id: 'hello',
      products: [],
    };
    return s;
  }
}
