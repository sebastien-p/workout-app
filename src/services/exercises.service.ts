import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DatabaseService } from './database.service';
import { DisplayExercise } from '../models/exercise.model';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  fetch(): Dexie.Promise<DisplayExercise[]> {
    return this.databaseService.exercises.toArray();
  }

  create(
    name: string = null,
    description: string = null
  ): DisplayExercise {
    return {
      name,
      description
    };
  }

  save(exercise: DisplayExercise = this.create()): Dexie.Promise<number> {
    return this.databaseService.exercises.put(exercise);
  }

  delete(id: number): Dexie.Promise<void> {
    const { sets, exercises } = this.databaseService;
    return this.databaseService.transaction('rw', [sets, exercises], () => {
      sets.where('exercise').equals(id).delete();
      exercises.delete(id);
    });
  }
}
