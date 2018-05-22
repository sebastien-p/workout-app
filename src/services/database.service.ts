import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { DatabaseExercise } from '../models/exercise.model';
import { DatabaseWorkout } from '../models/workout.model';
import { DatabaseSet } from '../models/set.model';
import { LoaderService } from './loader.service';

export type Table<T extends Identifiable> = Dexie.Table<T, number>;
export type Mapper<T, U> = (value: T) => Dexie.Promise<U>;
export type Updater<T> = (values: T[]) => T[];

@Injectable()
export class DatabaseService extends Dexie {
  exercises: Table<DatabaseExercise>;
  workouts: Table<DatabaseWorkout>;
  sets: Table<DatabaseSet>;

  constructor(
    private readonly loaderService: LoaderService
  ) {
    super('pro.fing.workout-app.db');

    this.version(1).stores({
      exercises: '++id,name',
      sets: '++id,exercise',
      workouts: '++id,name,*&sets'
    });

    this.handleHooks(['creating', 'updating', 'deleting'], () => this.load());
  }

  map<T, U>(list: T[], mapper: Mapper<T, U>): Dexie.Promise<U[]> {
    return Dexie.Promise.all(list.map(mapper));
  }

  add<T>(list: T[], values: T[] | T): T[] {
    return Array.from(new Set(list.concat(values)));
  }

  removeOne<T>(list: T[], value: T): T[] {
    return list.filter(item => item !== value);
  }

  removeAll<T>(list: T[], values: T[]): T[] {
    return list.filter(item => values.indexOf(item) < 0);
  }

  private handleHooks(hooks: string[], handler: Function): void {
    for (let table of this.tables) {
      for (let hook of hooks) {
        table.hook(hook as any, handler as any);
      }
    }
  }

  private load() {
    this.loaderService.show();
    Dexie.currentTransaction.on('complete', () => this.loaderService.hide());
  }
}
