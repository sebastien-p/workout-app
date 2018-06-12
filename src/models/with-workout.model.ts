import { LightWorkout, FullWorkout } from './workout.model';

type Workout = LightWorkout | FullWorkout;

export interface WithWorkoutId {
  workout: number;
}

export interface WithWorkout<T extends Workout = FullWorkout> {
  workout: T;
}

export interface WithWorkoutIds {
  workouts: number[];
}

export interface WithWorkouts<T extends Workout = FullWorkout> {
  workouts: T[];
}
