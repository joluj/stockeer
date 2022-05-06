import { EntityState } from '@ngrx/entity';
import { ProductDto } from '@stockeer/dtos';

export type ProductStateEntity = Omit<ProductDto, 'storageId'>;

export interface ProductState extends EntityState<ProductStateEntity> {
  selected: string | null;
}
