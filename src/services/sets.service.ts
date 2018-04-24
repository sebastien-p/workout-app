import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DisplayExercise } from '../models/exercise.model';
import { DisplaySet } from '../models/set.model';
import { DisplayWorkout } from '../models/workout.model';
import { Amplitude } from '../models/amplitude.enum';
import { Rythm } from '../models/rythm.enum';
import { DatabaseService } from './database.service';
import { ExercisesService } from './exercises.service';

@Injectable()
export class SetsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly exercises: ExercisesService
  ) {}

  create(
    amplitude: Amplitude = Amplitude.Normal,
    description: string = null,
    exercise: DisplayExercise = null,
    position: number = -1,
    repetitions: number = 0,
    rest: number = 0,
    restLast: number = rest,
    rythm: Rythm = Rythm.Normal
  ): DisplaySet {
    return {
      amplitude,
      description,
      exercise,
      position,
      repetitions,
      rest,
      restLast,
      rythm
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
      return id ? this.fetchOne(id) : this.fetchAll()
    });
  }

  save( // TODO: update workout
    workout: DisplayWorkout,
    { exercise, ...set }: DisplaySet
  ): Dexie.Promise<number> {
    const { workouts, sets } = this.database;
    return this.database.transaction('rw', [
      sets,
      workouts
    ], async () => {
      const id: number = await sets.put({
        exercise: exercise.id,
        ...set
      });
      workouts.where('id').equals(workout.id).modify(workout => {
        workout.sets.push(id);
      });
      return id;
    });
  }

  delete(id: number): Dexie.Promise<void> { // TODO: update workout
    return this.database.sets.delete(id);
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
}
