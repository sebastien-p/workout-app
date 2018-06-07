import { DisplayWorkout } from './workout.model';

export interface WithWorkoutId {
  workout: number;
}

export interface WithWorkout {
  workout: DisplayWorkout;
}
