import { EntityState } from '@ngrx/entity';
import { IStorage } from '@stockeer/types';

export interface StorageState extends EntityState<IStorage> {
  selected: string | null;
}
