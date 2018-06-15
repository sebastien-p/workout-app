import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { FullSet } from '../models/set.model';
import { LightRecord, FullRecord } from '../models/record.model';
import { Stats } from '../models/stats.model';
import { DatabaseService } from './database.service';
import { DateService } from './date.service';
import { SetsService } from './sets.service';

@Injectable()
export class RecordsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly dateService: DateService,
    private readonly sets: SetsService
  ) {}

  create(
    set: FullSet,
    serie: number = 1,
    value: number = 0,
    date: string = this.dateService.getISODate()
  ): FullRecord {
    return {
      set,
      serie,
      value,
      date
    };
  }

  createStats(
    series: number = 1,
    total: number = 0
  ): Stats {
    return {
      values: Array(series).fill(total / series),
      total
    };
  }

  fetch(set: FullSet): Dexie.Promise<Stats>;
  fetch(): Dexie.Promise<FullRecord[]>;
  fetch(set?: FullSet): any {
    const { exercises, workouts, sets, records } = this.database;
    return this.database.transaction<Stats | FullRecord[]>(
      'r',
      [exercises, workouts, sets, records],
      () => set ? this.fetchOne(set) : this.fetchAll()
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

  private get all(): Dexie.Collection<LightRecord, number> {
    const { records } = this.database;
    return records.orderBy('date').reverse();
  }

  private async fetchOne({ id, series }: FullSet): Dexie.Promise<Stats> {
    const { records } = this.database;
    const [lastSession] = await this.all.uniqueKeys();
    const results: LightRecord[] = !lastSession ? [] : await records
      .where({ set: id, date: lastSession })
      .and(({ serie }) => serie <= series)
      .sortBy('serie');
    return results.reduce<Stats>((stats, { serie, value }) => {
      stats.values[serie - 1] = value;
      stats.total += value;
      return stats;
    }, this.createStats(series));
  }

  private async fetchAll(): Dexie.Promise<FullRecord[]> {
    const { map } = this.database;
    return map(await this.all.toArray(), async ({ set, ...record }) => ({
      set: await this.sets.fetch(set),
      ...record
    }));
  }
}
