import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeEntity, ProductEntity } from '@stockeer/entities';
import { ProductChangedSubscriber } from './product-changed.subscriber';
import { BarcodeController } from './barcode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BarcodeEntity, ProductEntity])],
  controllers: [BarcodeController],
  providers: [BarcodeService, ProductChangedSubscriber],
})
export class BarcodeModule {}
