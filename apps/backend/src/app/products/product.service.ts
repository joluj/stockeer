import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '@stockeer/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Optional } from 'utility-types';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntityRepository: Repository<ProductEntity>
  ) {}

  getAll() {
    return this.productEntityRepository.find();
  }

  set(obj: Optional<Omit<ProductEntity, 'storage'>, 'id'>) {
    return this.productEntityRepository.save(obj);
  }

  async delete(productId: string) {
    return this.productEntityRepository.delete(productId);
  }
}
