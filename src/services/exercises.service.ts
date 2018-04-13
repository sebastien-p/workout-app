import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Exercise } from '../models/exercise.model';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  static create(
    name: string = null,
    description: string = null
  ): Exercise {
    return {
      name,
      description
    };
  }

  create(exercise: Exercise): Promise<number> {
    return this.databaseService.exercises.add(exercise);
  }

  read(): Promise<Exercise[]> {
    return this.databaseService.exercises.toArray();
  }

  update({ id, ...changes }: Exercise): Promise<number> {
    return this.databaseService.exercises.update(id, changes);
  }

  delete(id: number): Promise<void> { // TODO: remove it from workouts
    const { workouts, exercises } = this.databaseService;
    return this.databaseService.transaction('rw', [workouts, exercises], async () => {
      exercises.delete(id);
      const trololo = await this.databaseService.workouts
        .where('sets')
        .equals(id)
        .toArray();
      if (!trololo.length) { return; }
      trololo.forEach(workout => {
        workout.sets = workout.sets.filter(set => set !== id);
      });
      workouts.bulkPut(trololo);
    });
    // this.databaseService.workouts
    //   .where('exercises.exerciseId')
    //   .equals(id)
    //   .toArray()
    //   .then(data => console.log(data));
    // return this.databaseService.exercises.delete(id);
  }
}
