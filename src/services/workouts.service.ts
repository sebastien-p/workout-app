import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

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
    manual: boolean = false,
    name: string = null,
    rest: number = 0,
    sets: DisplaySet[] = []
  ): DisplayWorkout {
    return {
      description,
      manual,
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
    ], async () =>  {
      return await (id ? this.fetchOne(id) : this.fetchAll());
    });
  }

  save({ sets, ...workout }: DisplayWorkout): Dexie.Promise<number> {
    return this.database.workouts.put({
      sets: sets.map(set => set.id),
      ...workout
    });
  }

  delete({ id, sets: workoutSets }: DisplayWorkout): Dexie.Promise<void> {
    const { sets, workouts } = this.database;
    return this.database.transaction('rw', [
      sets,
      workouts
    ], async () => {
      sets.bulkDelete(workoutSets.map(set => set.id));
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
    return workouts.toCollection().primaryKeys().then(
      ids => map(ids, id => this.fetchOne(id))
    );
  }
}
