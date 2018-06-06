import { WithId } from './with-id.model';
import { WithName } from './with-name.model';
import { WithDescription } from './with-description.model';
import { WithRest } from './with-rest.model';
import { DisplaySet } from './set.model';

interface Workout extends WithId, WithName, WithDescription, WithRest {
  record: boolean;
}

export interface DatabaseWorkout extends Workout {
  sets: number[];
}

export interface DisplayWorkout extends Workout {
  sets: DisplaySet[];
}
