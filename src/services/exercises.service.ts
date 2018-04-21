import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Exercise } from '../models/exercise.model';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  fetch(): Promise<Exercise[]> {
    return this.databaseService.exercises.toArray();
  }

  create(
    name: string = null,
    description: string = null
  ): Exercise {
    return {
      name,
      description
    };
  }

  save(exercise: Exercise = this.create()): Promise<number> {
    return this.databaseService.exercises.put(exercise);
  }

  delete(id: number): Promise<void> {
    const { sets, exercises } = this.databaseService;
    return this.databaseService.transaction('rw', [sets, exercises], () => {
      sets.where('exercise').equals(id).delete();
      exercises.delete(id);
    });
  }
}
