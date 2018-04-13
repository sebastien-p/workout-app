import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Workout } from '../models/workout.model';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  static create(
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

  create(workout: Workout): Promise<number> {
    return this.databaseService.workouts.add(workout);
  }

  read(): Promise<Workout[]> {
    return this.databaseService.workouts.toArray();
  }

  update({ id, ...changes }: Workout): Promise<number> {
    return this.databaseService.workouts.update(id, changes);
  }

  delete(id: number): Promise<void> {
    return this.databaseService.workouts.delete(id);
  }
}
