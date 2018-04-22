import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { DisplayExercise } from '../models/exercise.model';
import { DisplaySet, DatabaseSet } from '../models/set.model';
import { Amplitude } from '../models/amplitude.enum';
import { Rythm } from '../models/rythm.enum';
import { DisplayWorkout } from '../models/workout.model';

@Injectable()
export class SetsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  fetch(workoutId: number): Promise<DisplaySet[]> {
    const { exercises, sets, } = this.databaseService;
    return this.databaseService.transaction('r', [exercises, sets], async () => {
      const results = await sets
        .where('workout')
        .equals(workoutId)
        .sortBy('position');
      const toto = await exercises
        .where('id')
        .anyOf(results.map(set => set.exercise))
        .toArray();
      return results.map<DisplaySet>(set => {
        const exercise = toto.find(titi => titi.id === set.exercise) as DisplayExercise;
        return {
          ...set,
          exercise
        };
      });
    });
  }

  create(
    amplitude: Amplitude = Amplitude.Normal,
    description: string = null,
    exercise: DisplayExercise = null,
    position: number = -1,
    repetitions: number = 0,
    rest: number = 0,
    restLast: number = rest,
    rythm: Rythm = Rythm.Normal,
    workout: number = null
  ): DisplaySet {
    return {
      amplitude,
      description,
      exercise,
      position,
      repetitions,
      rest,
      restLast,
      rythm,
      workout
    };
  }

  save({ id, ...set }: DisplaySet = this.create()): Promise<number> {
    const { sets } = this.databaseService;
    return this.databaseService.transaction('rw', [sets], async () => {
      if (set.position === null) {
        set.position = await sets
          .where('workout')
          .equals(set.workout)
          .count();
      }
      return sets.put({ ...set, exercise: set.exercise.id });
    });
  }

  delete(id: number): Promise<void> {
    return this.databaseService.sets.delete(id);
  }
}
