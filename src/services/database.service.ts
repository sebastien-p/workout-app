import Dexie from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { Exercise } from '../models/exercise.model';
import { Workout } from '../models/workout.model';
import { Set } from '../models/set.model';

export type Table<T extends Identifiable> = Dexie.Table<T, number>;

export class DatabaseService extends Dexie {
  exercises: Table<Exercise>;
  workouts: Table<Workout>;
  sets: Table<Set>;

  constructor() {
    super('TODO');
    this.version(1).stores({
      exercises: '++id',
      sets: '++id,exercise',
      workouts: '++id,*&sets'
    });
  }
}
