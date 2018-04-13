import { Nameable } from './nameable.model';

export interface Workout extends Nameable {
  manual: boolean;
  restTime: number;
  sets: number[];
}
