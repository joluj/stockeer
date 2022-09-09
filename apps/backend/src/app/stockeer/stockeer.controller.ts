import { Body, Controller, Get, Put } from '@nestjs/common';
import { StockeerService } from './stockeer.service';
import { SetStorageDto, StorageDto } from '@stockeer/dtos';
import { StorageEntity } from '@stockeer/entities';

@Controller('stockeers')
export class StockeerController {
  constructor(private readonly stockeerService: StockeerService) {}

  @Put()
  async set(@Body() stockeer: SetStorageDto): Promise<StorageDto> {
    const savedStockeer = await this.stockeerService.set({
      id: stockeer.id,
      name: stockeer.name,
    });

    return StorageEntity.toDto(savedStockeer);
  }

  @Get()
  getAll(): Promise<StorageDto[]> {
    return this.stockeerService
      .getAll()
      .then((stockeers) => stockeers.map((s) => StorageEntity.toDto(s)));
  }
}
