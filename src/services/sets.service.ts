import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DisplayExercise } from '../models/exercise.model';
import { DisplaySet } from '../models/set.model';
import { Amplitude } from '../models/amplitude.enum';
import { Rythm } from '../models/rythm.enum';
import { DatabaseService, Updater } from './database.service';
import { ExercisesService } from './exercises.service';

@Injectable()
export class SetsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly exercises: ExercisesService
  ) {}

  create(
    workout: number,
    amplitude: Amplitude = Amplitude.Normal,
    description: string = null,
    exercise: DisplayExercise = null,
    repetitions: number = 0,
    rest: number = 0,
    restLast: number = rest,
    rythm: Rythm = Rythm.Normal
  ): DisplaySet {
    return {
      amplitude,
      description,
      exercise,
      repetitions,
      rest,
      restLast,
      rythm,
      workout
    };
  }

  fetch(id: number): Dexie.Promise<DisplaySet>;
  fetch(): Dexie.Promise<DisplaySet[]>;
  fetch(id?: number): any {
    const { exercises, sets } = this.database;
    return this.database.transaction('r', [
      exercises,
      sets
    ], async () => {
      return await (id ? this.fetchOne(id) : this.fetchAll());
    });
  }

  save({ exercise, ...set }: DisplaySet): Dexie.Promise<number> {
    const { sets, workouts, add } = this.database;
    return this.database.transaction('rw', [
      sets,
      workouts
    ], async () => {
      const id: number = await sets.put({ exercise: exercise.id, ...set });
      this.updateWorkout(set.workout, ids => add(ids, id));
      return id;
    });
  }

  delete({ id, workout }: DisplaySet): Dexie.Promise<void> {
    const { sets, workouts, removeOne } = this.database;
    return this.database.transaction('rw', [
      sets,
      workouts
    ], async () => {
      this.updateWorkout(workout, ids => removeOne(ids, id));
      return await sets.delete(id);
    });
  }

  private fetchOne(id: number): Dexie.Promise<DisplaySet> {
    const { sets } = this.database;
    return sets.get(id).then(async ({ exercise, ...set }) => ({
      exercise: await this.exercises.fetch(exercise),
      ...set
    }));
  }

  private fetchAll(): Dexie.Promise<DisplaySet[]> {
    const { sets, map } = this.database;
    return sets.toCollection().primaryKeys().then(
      ids => map(ids, id => this.fetchOne(id))
    );
  }

  private updateWorkout(
    workout: number,
    setsUpdater: Updater<number>
  ): Dexie.Promise<number> {
    const { workouts } = this.database;
    return workouts.where({ id: workout }).modify(workout => {
      workout.sets = setsUpdater(workout.sets);
    });
  }
}
