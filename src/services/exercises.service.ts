import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DisplayExercise } from '../models/exercise.model';
import { DatabaseService, Updater } from './database.service';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly database: DatabaseService
  ) {}

  create(
    description: string = null,
    name: string = null
  ): DisplayExercise {
    return {
      description,
      name
    };
  }

  fetch(id: number): Dexie.Promise<DisplayExercise>;
  fetch(): Dexie.Promise<DisplayExercise[]>;
  fetch(id?: number): any {
    const { exercises } = this.database;
    return this.database.transaction('r', [
      exercises
    ], async () => {
      return await (id ? this.fetchOne(id) : this.fetchAll());
    });
  }

  save(exercise: DisplayExercise): Dexie.Promise<number> {
    const { exercises } = this.database;
    return this.database.transaction('rw', [
      exercises
    ], async () => {
      return await exercises.put({ ...exercise });
    });
  }

  delete({ id }: DisplayExercise): Dexie.Promise<void> {
    const { exercises, sets, workouts, removeAll } = this.database;
    return this.database.transaction('rw', [
      exercises,
      sets,
      workouts
    ], async () => {
      const ids: number[] = await sets.where({ exercise: id }).primaryKeys();
      this.updateWorkouts(ids, sets => removeAll(sets, ids));
      sets.bulkDelete(ids);
      return await exercises.delete(id);
    });
  }

  private fetchOne(id: number): Dexie.Promise<DisplayExercise> {
    const { exercises } = this.database;
    return exercises.get(id);
  }

  private fetchAll(): Dexie.Promise<DisplayExercise[]> {
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
