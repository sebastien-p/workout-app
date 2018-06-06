import { WithId } from './with-id.model';
import { WithExerciseId, WithExercise } from './with-exercise.model';
import { WithWorkoutId, WithWorkout } from './with-workout.model';

interface Record extends WithId {
  date: string;
  serie: number;
  value: number;
}

export interface DatabaseRecord
extends Record, WithExerciseId, WithWorkoutId {}

export interface DisplayRecord
extends Record, WithExercise, WithWorkout {}
