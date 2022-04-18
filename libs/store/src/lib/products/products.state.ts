import { EntityState } from '@ngrx/entity';
import { IProduct } from '@stockeer/dtos';

export interface ProductState extends EntityState<IProduct> {
  selected: string | null;
}
