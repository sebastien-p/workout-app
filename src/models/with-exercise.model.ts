import { LightExercise, FullExercise } from './exercise.model';

type Exercise = LightExercise | FullExercise;

export interface WithExerciseId {
  exercise: number;
}

export interface WithExercise<T extends Exercise = FullExercise> {
  exercise: T;
}

export interface WithExerciseIds {
  exercises: number[];
}

export interface WithExercises<T extends Exercise = FullExercise> {
  exercises: T[];
}
