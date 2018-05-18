import { Identifiable } from './identifiable.model';
import { Nameable } from './nameable.model';

interface Exercise extends Identifiable, Nameable {}

export interface DatabaseExercise extends Exercise {}

export interface DisplayExercise extends Exercise {}
