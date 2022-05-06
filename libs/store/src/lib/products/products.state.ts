import { EntityState } from '@ngrx/entity';
import { ProductDto } from '@stockeer/dtos';
import { Serialized } from '@stockeer/types';

export type ProductStateEntity = Serialized<Omit<ProductDto, 'storageId'>>;

export interface ProductState extends EntityState<ProductStateEntity> {
  selected: string | null;
}
