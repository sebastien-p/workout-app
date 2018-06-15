import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { FullExercise } from '../models/exercise.model';
import { LightWorkout, FullWorkout } from '../models/workout.model';
import { LightSet, FullSet } from '../models/set.model';
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
    { sets, ...workout }: FullWorkout,
    description: string = null,
    exercise: FullExercise = null,
    amplitude: Amplitude = Amplitude.Normal,
    rythm: Rythm = Rythm.Normal,
    rest: string = '00:00:00',
    restAfter: string = rest,
    series: number = 1
  ): FullSet {
    return {
      workout: { sets: sets.map(set => set.id), ...workout },
      description,
      exercise,
      amplitude,
      rythm,
      rest,
      restAfter,
      series
    };
  }

  fetch(id: number): Dexie.Promise<FullSet>;
  fetch(): Dexie.Promise<FullSet[]>;
  fetch(id?: number): any {
    const { exercises, workouts, sets } = this.database;
    return this.database.transaction<FullSet | FullSet[]>(
      'r',
      [exercises, workouts, sets],
      () => id ? this.fetchOne(id) : this.fetchAll()
    );
  }

  save({ exercise, workout, ...set }: FullSet): Dexie.Promise<number> {
    const { workouts, sets, add } = this.database;
    return this.database.transaction(
      'rw',
      [workouts, sets],
      async () => {
        const id: number = await sets.put({
          exercise: exercise.id,
          workout: workout.id,
          ...set
        });
        this.updateWorkout(workout, ids => add(ids, id));
        return id;
      }
    );
  }

  delete({ id, workout }: FullSet): Dexie.Promise<void> {
    const { workouts, sets, records, removeOne } = this.database;
    return this.database.transaction(
      'rw',
      [workouts, sets, records],
      () => {
        this.updateWorkout(workout, ids => removeOne(ids, id));
        records.where({ set: id }).delete();
        return sets.delete(id);
      }
    );
  }

  private async addRelations(
    { exercise: exerciseId, workout: workoutId, ...set }: LightSet
  ): Dexie.Promise<FullSet> {
    const { workouts } = this.database;
    const [exercise, workout] = await Dexie.Promise.all([
      this.exercises.fetch(exerciseId),
      workouts.get(workoutId)
    ]) as [FullExercise, LightWorkout]; // FIXME
    return { exercise, workout, ...set };
  }

  private async fetchOne(id: number): Dexie.Promise<FullSet> {
    const { sets } = this.database;
    return this.addRelations(await sets.get(id));
  }

  private async fetchAll(): Dexie.Promise<FullSet[]> {
    const { sets, map } = this.database;
    return map(
      await sets.toCollection().primaryKeys(),
      id => this.fetchOne(id)
    );
  }

  private updateWorkout(
    { id }: LightWorkout,
    setsUpdater: Updater<number>
  ): Dexie.Promise<number> {
    const { workouts } = this.database;
    return workouts.where({ id }).modify(workout => {
      workout.sets = setsUpdater(workout.sets);
    });
  }
}
