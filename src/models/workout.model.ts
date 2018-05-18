import { Identifiable } from './identifiable.model';
import { Nameable } from './nameable.model';
import { Pauseable } from './pauseable.model';
import { DisplaySet } from './set.model';

interface Workout extends Identifiable, Nameable, Pauseable {}

export interface DatabaseWorkout extends Workout {
  sets: number[];
}

export interface DisplayWorkout extends Workout {
  sets: DisplaySet[];
}
