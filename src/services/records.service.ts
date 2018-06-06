import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DisplayExercise } from '../models/exercise.model';
import { DisplayWorkout } from '../models/workout.model';
import { DatabaseRecord, DisplayRecord } from '../models/record.model';
import { DatabaseService } from './database.service';
import { ExercisesService } from './exercises.service';
import { WorkoutsService } from './workouts.service';

export type Where = {
  workout: number;
  exercise: number;
  serie: number;
};

@Injectable()
export class RecordsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly exercisesService: ExercisesService,
    private readonly workoutsService: WorkoutsService
  ) {}

  create(
    workout: DisplayWorkout,
    exercise: DisplayExercise,
    serie: number = 1,
    value: number = 0,
    date: string = new Date().toISOString()
  ): DisplayRecord {
    return {
      date,
      workout,
      exercise,
      serie,
      value
    };
  }

  fetch(where: Where): Dexie.Promise<DisplayRecord>;
  fetch(): Dexie.Promise<DisplayRecord[]>;
  fetch(where?: Where): any {
    const { exercises, workouts, sets, records } = this.database;
    return this.database.transaction('r', [
      exercises,
      workouts,
      sets,
      records
    ], async () => {
      return await (where ? this.fetchOne(where) : this.fetchAll());
    });
  }

  save(
    { workout, exercise, ...record }: DisplayRecord
  ): Dexie.Promise<number> {
    const { records } = this.database;
    return this.database.transaction('rw', [
      records
    ], async () => {
      return await records.put({
        workout: workout.id,
        exercise: exercise.id,
        ...record
      });
    });
  }

  delete({ id }: DisplayRecord): Dexie.Promise<void> {
    const { records } = this.database;
    return this.database.transaction('rw', [
      records
    ], async () => {
      return await records.delete(id);
    });
  }

  private async addRelations( // TODO: cleanup + optimize
    { workout: workoutId, exercise: exerciseId, ...record }: DatabaseRecord
  ): Dexie.Promise<DisplayRecord> {
    const [workout, exercise] = await Dexie.Promise.all([
      this.workoutsService.fetch(workoutId),
      this.exercisesService.fetch(exerciseId)
    ]) as [DisplayWorkout, DisplayExercise];
    return { workout, exercise, ...record };
  }

  private async fetchOne(where: Where): Dexie.Promise<DisplayRecord> {
    const { records } = this.database;
    const record: DatabaseRecord = await records.where(where).last();
    return record ? this.addRelations(record) : null;
  }

  private async fetchAll(): Dexie.Promise<DisplayRecord[]> {
    const { records, map } = this.database;
    return map(
      await records.orderBy('date').reverse().toArray(),
      record => this.addRelations(record)
    );
  }
}
