import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DisplayExercise } from '../models/exercise.model';
import { DatabaseService } from './database.service';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly database: DatabaseService
  ) {}

  create(
    name: string = null,
    description: string = null
  ): DisplayExercise {
    return {
      name,
      description
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
    return exercises.put({ ...exercise });
  }

  delete({ id }: DisplayExercise): Dexie.Promise<void> {// TODO + DRY
    const { exercises, sets, workouts } = this.database;
    return this.database.transaction('rw', [
      exercises,
      sets,
      workouts
    ], async () => {
      const ids: number[] = await sets.where('exercise').equals(id).primaryKeys();
      workouts.where('sets').anyOf(ids).modify(workout => {
        workout.sets = workout.sets.filter(set => ids.indexOf(set) < 0);
      });
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
    return exercises.toArray();
  }
}
