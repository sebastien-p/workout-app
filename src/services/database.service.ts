import Dexie from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { DatabaseExercise } from '../models/exercise.model';
import { DatabaseWorkout } from '../models/workout.model';
import { DatabaseSet } from '../models/set.model';

export type Table<T extends Identifiable> = Dexie.Table<T, number>;
export type Mapper<T, U> = (item: T) => Dexie.Promise<U>;

export class DatabaseService extends Dexie {
  exercises: Table<DatabaseExercise>;
  workouts: Table<DatabaseWorkout>;
  sets: Table<DatabaseSet>;

  constructor() {
    super('TODO');
    this.version(1).stores({
      exercises: '++id,name',
      sets: '++id,exercise',
      workouts: '++id,name,*&sets'
    });
  }

  map<T, U>(items: T[], mapper: Mapper<T, U>): Dexie.Promise<U[]> {
    return Dexie.Promise.all(items.map(mapper));
  }
}
