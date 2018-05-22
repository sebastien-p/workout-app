import { Identifiable } from './identifiable.model';
import { Pauseable } from './pauseable.model';
import { DisplayExercise } from './exercise.model';
import { Amplitude } from './amplitude.enum';
import { Rythm } from './rythm.enum';

interface Set extends Identifiable, Pauseable {
  amplitude: Amplitude;
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
