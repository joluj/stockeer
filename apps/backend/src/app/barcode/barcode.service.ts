import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BarcodeEntity } from '@stockeer/entities';

@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(BarcodeEntity)
    private readonly barcodeEntityRepository: Repository<BarcodeEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async set(entity: BarcodeEntity) {
    return await this.barcodeEntityRepository.save(entity);
  }

  async find(barcode: string): Promise<string | undefined> {
    const entity = await this.barcodeEntityRepository.findOne(barcode);

    return entity ? entity.name : undefined;
  }
}
