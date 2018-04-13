import Dexie from 'dexie';

import { Exercise } from '../models/exercise.model';
import { Workout } from '../models/workout.model';
import { Set } from '../models/set.model';

export class DatabaseService extends Dexie {
  exercises: Dexie.Table<Exercise, number>;
  workouts: Dexie.Table<Workout, number>;
  sets: Dexie.Table<Set, number>;

  constructor() {
    super('TODO');
    this.version(1).stores({
      exercises: `++id`,
      sets: `++id,*&exercice`,
      workouts: `++id,*&sets`
    });
  }
}
