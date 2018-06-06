import { WithId } from './with-id.model';
import { WithDescription } from './with-description.model';
import { WithRest } from './with-rest.model';
import { WithExerciseId, WithExercise } from './with-exercise.model';
import { WithWorkoutId } from './with-workout.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';

interface Set extends WithId, WithDescription, WithRest, WithWorkoutId {
  amplitude: Amplitude;
  rythm: Rythm;
  series: number;
}

export interface DatabaseSet extends Set, WithExerciseId {}

export interface DisplaySet extends Set, WithExercise {}
