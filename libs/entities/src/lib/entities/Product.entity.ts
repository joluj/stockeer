import { Unit } from '@stockeer/types';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ProductDto, QuantityDto } from '@stockeer/dtos';
import { StorageEntity } from './Storage.entity';

export class QuantityEntity {
  @Column()
  amount!: number;
  @Column({ type: 'enum', enum: Unit, default: Unit.PIECE })
  unit!: Unit;

  constructor(dto: QuantityDto) {
    if (dto) {
      this.amount = dto.amount;
      this.unit = dto.unit;
    }
  }
}

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  expiryDate!: string;

  @Column()
  name!: string;

  @Column(() => QuantityEntity)
  quantity!: QuantityEntity;

  @ManyToOne(() => StorageEntity)
  storage?: StorageEntity;
  @Column()
  @RelationId((product: ProductEntity) => product.storage)
  storageId!: string;

  constructor(dto: ProductDto) {
    if (dto) {
      this.id = dto.id;
      this.expiryDate = dto.expiryDate;
      this.name = dto.name;
      this.quantity = dto.quantity;
      this.storageId = dto.storageId;
    }
  }
}
