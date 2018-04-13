import { Identifiable } from './identifiable.model';
import { Amplitude } from './amplitude.model';
import { Rythm } from './rythm.model';

export interface Set extends Identifiable {
  amplitude: Amplitude;
  exercise: number;
  repetitions: number;
  rest: number;
  restLast: number;
  rythm: Rythm;
}
