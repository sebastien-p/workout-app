import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { LightExercise } from '../models/exercise.model';
import { LightRecord } from '../models/record.model';
import { LightSet } from '../models/set.model';
import { WithId } from '../models/with-id.model';
import { WithName } from '../models/with-name.model';
import { LightWorkout } from '../models/workout.model';
import { AlertService } from './alert.service';
import { LoaderService } from './loader.service';

export type Table<T extends WithId = WithId> = Dexie.Table<T, number>;
export type Mapper<T, U> = (value: T) => Promise<U>;
export type Updater<T> = (values: T[]) => T[];

export interface Dump extends WithName {
  items: WithId[];
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  exercises: Table<LightExercise>;
  workouts: Table<LightWorkout>;
  sets: Table<LightSet>;
  records: Table<LightRecord>;

  constructor(
    private readonly alertService: AlertService,
    private readonly loaderService: LoaderService
  ) {
    super('pro.fing.workout-app.db'); // FIXME

    this.version(1).stores({
      exercises: '++id,name',
      workouts: '++id,name,*&sets',
      sets: '++id,exercise',
      records: '++id,set,date,[set+date]'
    });

    this.handleHooks(['creating', 'updating', 'deleting'], () => this.load());
  }

  map<T, U>(list: T[], mapper: Mapper<T, U>): Promise<U[]> {
    return Promise.all(list.map(mapper));
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

  async export(): Promise<Dump[]> {
    const records: boolean = await this.withRecords;

    return this.transaction('r', this.tables, () =>
      this.map(this.tables, async table => {
        const { name } = table;

        return {
          items: name !== 'records' || records ? await table.toArray() : [],
          name
        };
      })
    );
  }

  async import(dumps: Dump[]): Promise<(number | void)[]> {
    const records: boolean = await this.withRecords;

    return this.transaction('rw', this.tables, () =>
      this.map(dumps, async ({ name, items }) => {
        if (name !== 'records' || records) {
          const table: Table = this.table(name);
          await table.clear();
          return table.bulkAdd(items);
        }
      })
    );
  }

  private get withRecords(): Promise<boolean> {
    return this.alertService.confirm('With records?');
  }

  private handleHooks(hooks: string[], handler: () => void): void {
    for (const table of this.tables) {
      for (const hook of hooks) {
        table.hook(hook as any, handler); // FIXME
      }
    }
  }

  private load(): void {
    this.loaderService.show();
    Dexie.currentTransaction.on('complete', () => this.loaderService.hide());
  }
}
