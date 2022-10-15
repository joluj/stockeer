import { EntityState } from '@ngrx/entity';
import { StorageDto } from '@stockeer/dtos';
import { Serialized } from '@stockeer/types';

export type StorageStateEntity = Serialized<StorageDto>;

export interface StorageState extends EntityState<StorageStateEntity> {
  selected: string[];
}
