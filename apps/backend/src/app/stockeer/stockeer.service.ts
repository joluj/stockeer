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

  set(obj: Optional<Omit<StorageEntity, 'products' | 'productIds'>, 'id'>) {
    return this.storageEntityRepository.save(obj);
  }
}
