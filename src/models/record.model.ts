import { DisplayExercise } from './exercise.model';
import { DisplayWorkout } from './workout.model';

interface Record {
  date: number;
  serie: number;
  value: number;
}

export interface DatabaseRecord extends Record {
  workout: number;
  exercise: number;
}

export interface DisplayRecord extends Record {
  workout: DisplayWorkout;
  exercise: DisplayExercise;
}
