import { EntityState } from '@ngrx/entity';
import { IStorage } from '@stockeer/dtos';

export interface StorageState extends EntityState<IStorage> {
  selected: string | null;
}
