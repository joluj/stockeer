import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { StorageDto } from '@stockeer/dtos';
import { ProductEntity } from './Product.entity';

@Entity()
export class StorageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.storage)
  products!: ProductEntity[];
  @RelationId((storage: StorageEntity) => storage.products)
  productIds!: string[];

  constructor(dto: StorageDto) {
    if (dto) {
      this.id = dto.id;
      this.name = dto.name;
      this.products = [];
      this.productIds = dto.products.slice();
    }
  }
}
