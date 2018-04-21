import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Set } from '../models/set.model';
import { Amplitude } from '../models/amplitude.enum';
import { Rythm } from '../models/rythm.enum';

@Injectable()
export class SetsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  fetch(): Promise<Set[]> {
    return this.databaseService.sets.toArray();
  }

  create(
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

  save({ id, ...set }: Set = this.create()): Promise<number> {
    return this.databaseService.sets.put(set, id);
  }

  delete(id: number): Promise<void> {
    return this.databaseService.sets.delete(id);
  }
}
