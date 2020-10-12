import { Injectable } from '@angular/core';

import { FullExercise } from '../models/exercise.model';
import { DatabaseService, Updater } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  constructor(private readonly database: DatabaseService) {}

  create(
    name: string = '',
    description: string = '',
    sided: boolean = false
  ): FullExercise {
    return { name, description, sided };
  }

  fetch(id: number): Promise<FullExercise>;
  fetch(): Promise<FullExercise[]>;
  fetch(id?: number): any {
    const { exercises } = this.database;
    return this.database.transaction<FullExercise | FullExercise[]>(
      'r',
      [exercises],
      () => (id ? this.fetchOne(id) : this.fetchAll())
    );
  }

  save(exercise: FullExercise): Promise<number> {
    const { exercises } = this.database;
    return this.database.transaction('rw', [exercises], () =>
      exercises.put({ ...exercise })
    );
  }

  delete({ id }: FullExercise): Promise<void> {
    const { exercises, workouts, sets, records, removeAll } = this.database;
    return this.database.transaction(
      'rw',
      [exercises, workouts, sets, records],
      async () => { // FIXME: await exerywhere or Promise.all? (not only here) + warn?
        const ids: number[] = await sets.where({ exercise: id }).primaryKeys();
        this.updateWorkouts(ids, workoutSets => removeAll(workoutSets, ids));
        records.where('set').anyOf(ids).delete();
        sets.bulkDelete(ids);
        return await exercises.delete(id);
      }
    );
  }

  private fetchOne(id: number): Promise<FullExercise> {
    const { exercises } = this.database;
    return exercises.get(id);
  }

  private fetchAll(): Promise<FullExercise[]> {
    const { exercises } = this.database;
    return exercises.orderBy('name').toArray();
  }

  private updateWorkouts(
    sets: number[],
    setsUpdater: Updater<number>
  ): Promise<number> {
    const { workouts } = this.database;
    return workouts
      .where('sets')
      .anyOf(sets)
      .modify(workout => {
        workout.sets = setsUpdater(workout.sets);
      });
  }
}
