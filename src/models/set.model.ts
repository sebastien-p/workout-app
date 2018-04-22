import { Identifiable } from './identifiable.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';
import { DisplayExercise } from './exercise.model';

interface Set extends Identifiable {
  amplitude: Amplitude;
  position: number;
  repetitions: number;
  rest: number;
  restLast: number;
  rythm: Rythm;
  workout: number;
}

export interface DatabaseSet extends Set {
  exercise: number;
}

export interface DisplaySet extends Set {
  exercise: DisplayExercise;
}
