import { DisplayExercise } from './exercise.model';

export interface WithExerciseId {
  exercise: number;
}

export interface WithExercise {
  exercise: DisplayExercise;
}
