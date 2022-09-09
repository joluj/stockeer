import { Module } from '@nestjs/common';
import { StockeerController } from './stockeer.controller';
import { StockeerService } from './stockeer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageEntity } from '@stockeer/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StorageEntity])],
  controllers: [StockeerController],
  providers: [StockeerService],
})
export class StockeerModule {}
