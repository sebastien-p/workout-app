import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { WithId } from '../models/with-id.model';
import { LightExercise } from '../models/exercise.model';
import { LightWorkout } from '../models/workout.model';
import { LightSet } from '../models/set.model';
import { LightRecord } from '../models/record.model';
import { LoaderService } from './loader.service';

export type Table<T extends WithId = WithId> = Dexie.Table<T, number>;
export type Mapper<T, U> = (value: T) => Promise<U>
export type Updater<T> = (values: T[]) => T[];

export type Dump = {
  table: string;
  items: WithId[];
};

@Injectable()
export class DatabaseService
extends Dexie {
  exercises: Table<LightExercise>;
  workouts: Table<LightWorkout>;
  sets: Table<LightSet>;
  records: Table<LightRecord>;

  constructor(
    private readonly loaderService: LoaderService
  ) {
    super('pro.fing.workout-app.db');

    this.version(1).stores({
      exercises: '++id,name',
      workouts: '++id,name,*&sets',
      sets: '++id,exercise',
      records: '++id,set,date,[set+date]'
    });

    this.handleHooks(['creating', 'updating', 'deleting'], () => this.load());

    // this.export().then(dumps => console.log(JSON.stringify(dumps))); // TODO
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

  export(): Dexie.Promise<Dump[]> {
    return this.transaction(
      'r',
      this.tables,
      () => this.map(this.tables, (async table => ({
        items: await table.toArray(),
        table: table.name
      })))
    );
  }

  import(dumps: Dump[]): Dexie.Promise<number[]> {
    return this.transaction(
      'rw',
      this.tables,
      () => this.map(dumps, async ({ table: name, items }) => {
        const table: Table = this.table(name);
        await table.clear();
        return table.bulkAdd(items);
      })
    );
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
