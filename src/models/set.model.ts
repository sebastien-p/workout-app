import { Identifiable } from './identifiable.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';

export interface Set extends Identifiable {
  amplitude: Amplitude;
  exercise: number;
  repetitions: number;
  rest: number;
  restLast: number;
  rythm: Rythm;
}
