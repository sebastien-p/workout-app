import { WithId } from './with-id.model';
import { WithSetId, WithSet } from './with-set.model';

interface Record extends WithId {
  date: string;
  serie: number;
  value: number;
}

export interface LightRecord extends Record, WithSetId {}

export interface FullRecord extends Record, WithSet {}
