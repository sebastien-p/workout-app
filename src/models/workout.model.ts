import { WithId } from './with-id.model';
import { WithName } from './with-name.model';
import { WithDescription } from './with-description.model';
import { WithRest } from './with-rest.model';
import { WithSetIds, WithSets } from './with-set.model';

interface Workout extends WithId, WithName, WithDescription, WithRest {
  record: boolean;
}

export interface LightWorkout extends Workout, WithSetIds {}

export interface FullWorkout extends Workout, WithSets {}
