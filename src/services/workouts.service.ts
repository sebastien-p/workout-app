import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { FullSet } from '../models/set.model';
import { FullWorkout } from '../models/workout.model';
import { DatabaseService } from './database.service';
import { SetsService } from './sets.service';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly sets: SetsService
  ) {}

  create(
    name: string = '',
    description: string = '',
    record: boolean = true,
    sets: FullSet[] = []
  ): FullWorkout {
    return {
      name,
      description,
      record,
      sets
    };
  }

  fetch(id: number): Dexie.Promise<FullWorkout>;
  fetch(): Dexie.Promise<FullWorkout[]>;
  fetch(id?: number): any {
    const { exercises, workouts, sets } = this.database;
    return this.database.transaction<FullWorkout | FullWorkout[]>(
      'r',
      [exercises, workouts, sets],
      () => id ? this.fetchOne(id) : this.fetchAll()
    );
  }

  save({ sets, ...workout }: FullWorkout): Dexie.Promise<number> {
    const { workouts } = this.database;
    return this.database.transaction(
      'rw',
      [workouts],
      () => workouts.put({ sets: sets.map(set => set.id), ...workout })
    );
  }

  delete({ id, sets: workoutSets }: FullWorkout): Dexie.Promise<void> {
    const { workouts, sets, records } = this.database;
    return this.database.transaction(
      'rw',
      [workouts, sets, records],
      () => {
        const setIds: number[] = workoutSets.map(set => set.id);
        records.where('set').anyOf(setIds).delete();
        sets.bulkDelete(setIds);
        return workouts.delete(id);
      }
    );
  }

  private async fetchOne(id: number): Dexie.Promise<FullWorkout> {
    const { workouts, map } = this.database;
    const { sets, ...workout } = await workouts.get(id);
    return { sets: await map(sets, set => this.sets.fetch(set)), ...workout };
  }

  private async fetchAll(): Dexie.Promise<FullWorkout[]> {
    const { workouts, map } = this.database;
    return map(
      await workouts.orderBy('name').primaryKeys(),
      id => this.fetchOne(id)
    );
  }
}
