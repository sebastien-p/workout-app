import { Injectable } from '@angular/core';

import { Amplitude } from '../models/amplitude.enum';
import { FullExercise } from '../models/exercise.model';
import { Rythm } from '../models/rythm.enum';
import { LightSet, FullSet } from '../models/set.model';
import { LightWorkout } from '../models/workout.model';
import { DatabaseService, Updater } from './database.service';
import { ExercisesService } from './exercises.service';
import { Mode } from '../models/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly exercises: ExercisesService
  ) {}

  create(
    workout: LightWorkout,
    description: string = null,
    exercise: FullExercise = null,
    mode: Mode = Mode.Repetitions,
    amplitude: Amplitude = Amplitude.Normal,
    rythm: Rythm = Rythm.Normal,
    time: string = '00:00:00',
    timeSided: string = time,
    timeAfter: string = time,
    series: number = 1
  ): FullSet {
    return {
      workout,
      description,
      exercise,
      mode,
      amplitude,
      rythm,
      time,
      timeSided,
      timeAfter,
      series
    };
  }

  fetch(id: number): Promise<FullSet>;
  fetch(): Promise<FullSet[]>;
  fetch(id?: number): any {
    const { exercises, workouts, sets } = this.database;
    return this.database.transaction<FullSet | FullSet[]>(
      'r',
      [exercises, workouts, sets],
      () => (id ? this.fetchOne(id) : this.fetchAll())
    );
  }

  save({ exercise, workout, ...set }: FullSet): Promise<number> {
    const { workouts, sets, records, add } = this.database;
    return this.database.transaction(
      'rw',
      [workouts, sets, records],
      async () => {
        const id: number = await sets.put({
          exercise: exercise.id,
          workout: workout.id,
          ...set
        });

        if (!set.id) {
          await this.updateWorkout(workout, ids => add(ids, id));
        }

        return id;
      }
    );
  }

  delete({ id, workout }: FullSet): Promise<void> {
    const { workouts, sets, records, removeOne } = this.database;
    return this.database.transaction(
      'rw',
      [workouts, sets, records],
      async () => {
        await Promise.all([
          this.updateWorkout(workout, ids => removeOne(ids, id)),
          records.where({ set: id }).delete(),
          sets.delete(id)
        ]);
      }
    );
  }

  private async addRelations({
    exercise: exerciseId,
    workout: workoutId,
    ...set
  }: LightSet): Promise<FullSet> {
    const { workouts } = this.database;
    const [exercise, workout] = await Promise.all([
      this.exercises.fetch(exerciseId),
      workouts.get(workoutId)
    ]);
    return { exercise, workout, ...set };
  }

  private async fetchOne(id: number): Promise<FullSet> {
    const { sets } = this.database;
    return this.addRelations(await sets.get(id));
  }

  private async fetchAll(): Promise<FullSet[]> {
    const { sets, map } = this.database;
    return map(await sets.toCollection().primaryKeys(), id =>
      this.fetchOne(id)
    );
  }

  private updateWorkout(
    { id }: LightWorkout,
    setsUpdater: Updater<number>
  ): Promise<number> {
    const { workouts } = this.database;
    return workouts.where({ id }).modify(workout => {
      workout.sets = setsUpdater(workout.sets);
    });
  }
}
