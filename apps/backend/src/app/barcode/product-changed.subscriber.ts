import {
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ProductEntity } from '@stockeer/entities';
import { Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BarcodeService } from './barcode.service';

@EventSubscriber()
export class ProductChangedSubscriber
  implements EntitySubscriberInterface<ProductEntity>
{
  readonly logger = new Logger(ProductChangedSubscriber.name);

  constructor(
    @InjectEntityManager()
    manager: EntityManager,
    private readonly barcodeService: BarcodeService
  ) {
    manager.connection.subscribers.push(this);
  }

  listenTo() {
    return ProductEntity;
  }

  async afterUpdate(event: UpdateEvent<ProductEntity>) {
    const { barcode, name } = event.entity;
    await this.barcodeService.set({ barcode, name });
  }

  async afterInsert(event: InsertEvent<ProductEntity>) {
    const { barcode, name } = event.entity;
    await this.barcodeService.set({ barcode, name });
  }
}
