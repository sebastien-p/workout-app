import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { FullExercise } from '../models/exercise.model';
import { DatabaseService, Updater } from './database.service';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly database: DatabaseService
  ) {}

  create(
    name: string = '',
    description: string = ''
  ): FullExercise {
    return {
      name,
      description
    };
  }

  fetch(id: number): Dexie.Promise<FullExercise>;
  fetch(): Dexie.Promise<FullExercise[]>;
  fetch(id?: number): any {
    const { exercises } = this.database;
    return this.database.transaction<FullExercise | FullExercise[]>(
      'r',
      [exercises],
      () => id ? this.fetchOne(id) : this.fetchAll()
    );
  }

  save(exercise: FullExercise): Dexie.Promise<number> {
    const { exercises } = this.database;
    return this.database.transaction(
      'rw',
      [exercises],
      () => exercises.put({ ...exercise })
    );
  }

  delete({ id }: FullExercise): Dexie.Promise<void> {
    const { exercises, workouts, sets, records, removeAll } = this.database;
    return this.database.transaction(
      'rw',
      [exercises, workouts, sets, records],
      async () => {
        const ids: number[] = await sets.where({ exercise: id }).primaryKeys();
        this.updateWorkouts(ids, sets => removeAll(sets, ids));
        records.where('set').anyOf(ids).delete();
        sets.bulkDelete(ids);
        return await exercises.delete(id);
      }
    );
  }

  private fetchOne(id: number): Dexie.Promise<FullExercise> {
    const { exercises } = this.database;
    return exercises.get(id);
  }

  private fetchAll(): Dexie.Promise<FullExercise[]> {
    const { exercises } = this.database;
    return exercises.orderBy('name').toArray();
  }

  private updateWorkouts(
    sets: number[],
    setsUpdater: Updater<number>
  ): Dexie.Promise<number> {
    const { workouts } = this.database;
    return workouts.where('sets').anyOf(sets).modify(workout => {
      workout.sets = setsUpdater(workout.sets);
    });
  }
}
