import { WithId } from './with-id.model';
import { WithDescription } from './with-description.model';
import { WithRest } from './with-rest.model';
import { WithExerciseId, WithExercise } from './with-exercise.model';
import { WithWorkoutId, WithWorkout } from './with-workout.model';
import { LightWorkout } from './workout.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';

interface Set extends WithId, WithDescription, WithRest {
  amplitude: Amplitude;
  rythm: Rythm;
  series: number;
}

export interface LightSet
extends Set, WithExerciseId, WithWorkoutId {}

export interface FullSet
extends Set, WithExercise, WithWorkout<LightWorkout> {}
