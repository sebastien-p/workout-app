import { Identifiable } from './identifiable.model';
import { DisplayExercise } from './exercise.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';

interface Set extends Identifiable {
  auto: boolean;
  amplitude: Amplitude;
  rest: number;
  rythm: Rythm;
  series: number;
  workout: number;
}

export interface DatabaseSet extends Set {
  exercise: number;
}

export interface DisplaySet extends Set {
  exercise: DisplayExercise;
}
