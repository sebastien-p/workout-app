import { Nameable } from './nameable.model';

interface Exercise extends Nameable {}

export interface DatabaseExercise extends Exercise {}

export interface DisplayExercise extends Exercise {}
