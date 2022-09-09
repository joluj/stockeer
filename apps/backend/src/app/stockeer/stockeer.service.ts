import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StorageEntity } from '@stockeer/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Optional } from 'utility-types';

@Injectable()
export class StockeerService {
  constructor(
    @InjectRepository(StorageEntity)
    private readonly storageEntityRepository: Repository<StorageEntity>
  ) {}

  getAll() {
    return this.storageEntityRepository.find();
  }

  async set(
    obj: Optional<Omit<StorageEntity, 'products' | 'productIds'>, 'id'>
  ) {
    const { id } = await this.storageEntityRepository.save(obj);
    return this.storageEntityRepository.findOne({ id });
  }
}
