import { Nameable } from './nameable.model';
import { DisplaySet } from './set.model';

interface Workout extends Nameable {
  auto: boolean;
  rest: number;
}

export interface DatabaseWorkout extends Workout {
  sets: number[];
}

export interface DisplayWorkout extends Workout {
  sets: DisplaySet[];
}
