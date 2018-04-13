import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Set } from '../models/set.model';
import { Amplitude } from '../models/amplitude.model';
import { Rythm } from '../models/rythm.model';

@Injectable()
export class SetsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  static create(
    amplitude: Amplitude = Amplitude.Normal,
    description: string = null,
    exercise: number = null,
    repetitions: number = 0,
    rest: number = 0,
    restLast: number = rest,
    rythm: Rythm = Rythm.Normal
  ): Set {
    return {
      amplitude,
      description,
      exercise,
      repetitions,
      rest,
      restLast,
      rythm
    };
  }

  create(workout: Set): Promise<number> {
    return this.databaseService.sets.add(workout);
  }

  read(): Promise<Set[]> {
    return this.databaseService.sets.toArray();
  }

  update({ id, ...changes }: Set): Promise<number> {
    return this.databaseService.sets.update(id, changes);
  }

  delete(id: number): Promise<void> {
    return this.databaseService.sets.delete(id);
  }
}
