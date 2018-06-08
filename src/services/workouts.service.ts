import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DisplaySet } from '../models/set.model';
import { DisplayWorkout } from '../models/workout.model';
import { DatabaseService } from './database.service';
import { SetsService } from './sets.service';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly sets: SetsService
  ) {}

  create(
    description: string = null,
    record: boolean = true,
    name: string = null,
    rest: string = '00:00:00',
    sets: DisplaySet[] = []
  ): DisplayWorkout {
    return {
      description,
      record,
      name,
      rest,
      sets
    };
  }

  fetch(id: number): Dexie.Promise<DisplayWorkout>;
  fetch(): Dexie.Promise<DisplayWorkout[]>;
  fetch(id?: number): any {
    const { exercises, sets, workouts } = this.database;
    return this.database.transaction('r', [
      exercises,
      sets,
      workouts
    ], async () => {
      return await (id ? this.fetchOne(id) : this.fetchAll());
    });
  }

  save({ sets, ...workout }: DisplayWorkout): Dexie.Promise<number> {
    const { workouts } = this.database;
    return this.database.transaction('rw', [
      workouts
    ], async () => {
      return await workouts.put({ sets: sets.map(set => set.id), ...workout });
    });
  }

  delete({ id, sets: workoutSets }: DisplayWorkout): Dexie.Promise<void> {
    const { sets, workouts, records } = this.database;
    return this.database.transaction('rw', [
      sets,
      workouts,
      records
    ], async () => {
      sets.bulkDelete(workoutSets.map(set => set.id));
      records.where({ workout: id }).delete();
      return await workouts.delete(id);
    });
  }

  private fetchOne(id: number): Dexie.Promise<DisplayWorkout> {
    const { workouts, map } = this.database;
    return workouts.get(id).then(async ({ sets, ...workout }) => ({
      sets: await map(sets, set => this.sets.fetch(set)),
      ...workout
    }));
  }

  private fetchAll(): Dexie.Promise<DisplayWorkout[]> {
    const { workouts, map } = this.database;
    return workouts.orderBy('name').primaryKeys().then(
      ids => map(ids, id => this.fetchOne(id))
    );
  }
}
