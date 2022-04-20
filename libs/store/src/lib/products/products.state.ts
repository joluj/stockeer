import { EntityState } from '@ngrx/entity';
import { IProduct } from '@stockeer/types';

export interface ProductState extends EntityState<IProduct> {
  selected: string | null;
}
