import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Workout } from '../models/workout.model';
import { Set } from '../models/set.model';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  fetch(): Promise<Workout[]> {
    return this.databaseService.workouts.toArray();
  }

  create(
    description: string = null,
    manual: boolean = false,
    name: string = null,
    restTime: number = 0,
    sets: number[] = []
  ): Workout {
    return {
      description,
      manual,
      name,
      restTime,
      sets
    };
  }

  save(workout: Workout = this.create()): Promise<number> {
    return this.databaseService.workouts.put(workout);
  }

  delete(id: number): Promise<void> {
    return this.databaseService.workouts.delete(id);
  }

  fetchSets(ids: number[]): Promise<Set[]> {
    return this.databaseService.sets.where('id').anyOf(ids).toArray();
  }
}
