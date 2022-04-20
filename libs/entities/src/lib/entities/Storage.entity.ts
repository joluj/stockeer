import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ProductEntity } from '@stockeer/entities';
import { StorageDto } from '@stockeer/dtos';

@Entity()
export class StorageEntity {
  @PrimaryGeneratedColumn()
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
