import { EntityState } from '@ngrx/entity';
import { StorageDto } from '@stockeer/dtos';

export interface StorageState extends EntityState<StorageDto> {
  selected: string | null;
}
