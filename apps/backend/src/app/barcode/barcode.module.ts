import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeEntity } from './barcode.entity';
import { ProductEntity } from '@stockeer/entities';
import { ProductChangedSubscriber } from './product-changed.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([BarcodeEntity, ProductEntity])],
  providers: [BarcodeService, ProductChangedSubscriber],
})
export class BarcodeModule {}
