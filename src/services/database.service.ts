import Dexie from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { DatabaseExercise } from '../models/exercise.model';
import { DatabaseWorkout } from '../models/workout.model';
import { DatabaseSet } from '../models/set.model';

export type Table<T extends Identifiable> = Dexie.Table<T, number>;

export class DatabaseService extends Dexie {
  exercises: Table<DatabaseExercise>;
  workouts: Table<DatabaseWorkout>;
  sets: Table<DatabaseSet>;

  constructor() {
    super('TODO');
    this.version(1).stores({
      exercises: '++id,name',
      sets: '++id,exercise,position,workout',
      workouts: '++id,name'
    });
  }
}
