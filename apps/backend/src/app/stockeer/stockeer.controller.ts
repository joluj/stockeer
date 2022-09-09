import { Body, Controller, Get, Put } from '@nestjs/common';
import { StockeerService } from './stockeer.service';
import { SetStorageDto, StorageDto } from '@stockeer/dtos';

@Controller('stockeers')
export class StockeerController {
  constructor(private readonly stockeerService: StockeerService) {}

  @Put()
  async set(@Body() stockeer: SetStorageDto): Promise<StorageDto> {
    const savedStockeer = await this.stockeerService.set({
      id: stockeer.id,
      name: stockeer.name,
    });

    return {
      name: savedStockeer.name,
      id: savedStockeer.id,
      products: savedStockeer.productIds,
    };
  }

  @Get()
  getAll() {
    return this.stockeerService.getAll();
  }
}
