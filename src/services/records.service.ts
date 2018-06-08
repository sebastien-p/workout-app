import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { FullSet } from '../models/set.model';
import { LightRecord, FullRecord } from '../models/record.model';
import { DatabaseService } from './database.service';
import { SetsService } from './sets.service';

export type Where = {
  set: number;
  serie: number;
};

@Injectable()
export class RecordsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly sets: SetsService
  ) {}

  create(
    set: FullSet,
    serie: number = 1,
    value: number = 0,
    date: string = new Date().toISOString()
  ): FullRecord {
    return {
      set,
      serie,
      value,
      date
    };
  }

  fetch(where: Where): Dexie.Promise<FullRecord>;
  fetch(): Dexie.Promise<FullRecord[]>;
  fetch(where?: Where): any {
    const { exercises, workouts, sets, records } = this.database;
    return this.database.transaction<FullRecord | FullRecord[]>(
      'r',
      [exercises, workouts, sets, records],
      () => where ? this.fetchOne(where) : this.fetchAll()
    );
  }

  save({ set, ...record }: FullRecord): Dexie.Promise<number> {
    const { records } = this.database;
    return this.database.transaction(
      'rw',
      [records],
      () => records.put({ set: set.id, ...record })
    );
  }

  delete({ id }: FullRecord): Dexie.Promise<void> {
    const { records } = this.database;
    return this.database.transaction(
      'rw',
      [records],
      () => records.delete(id)
    );
  }

  private async addRelations(
    { set, ...record }: LightRecord
  ): Dexie.Promise<FullRecord> {
    return { set: await this.sets.fetch(set), ...record };
  }

  private async fetchOne(where: Where): Dexie.Promise<FullRecord> {
    const { records } = this.database;
    const record: LightRecord = await records.where(where).last();
    return record ? this.addRelations(record) : null;
  }

  private async fetchAll(): Dexie.Promise<FullRecord[]> {
    const { records, map } = this.database;
    return map(
      await records.orderBy('date').reverse().toArray(),
      record => this.addRelations(record)
    );
  }
}
