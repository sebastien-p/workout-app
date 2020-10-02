import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { LightRecord, FullRecord } from '../models/record.model';
import { FullSet } from '../models/set.model';
import { Stats } from '../models/stats.model';
import { DatabaseService } from './database.service';
import { DateService } from './date.service';
import { SetsService } from './sets.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly dateService: DateService,
    private readonly sets: SetsService
  ) {}

  create(
    set: FullSet,
    date: string = this.dateService.getISODate(),
    serie: number = 1,
    value: number = 0
  ): FullRecord {
    return { set, serie, value, date };
  }

  createStats(set: FullSet, date?: string): Stats {
    return {
      total: 0,
      records: [...Array(set.series)].map((value, index) => {
        return this.create(set, date, index + 1);
      })
    };
  }

  getStats(set: FullSet, date?: string): [Stats, Promise<Stats>] {
    return [this.createStats(set, date), this.fetch(set)];
  }

  setSerieValue(stats: Stats, serie: number, newValue: number): FullRecord {
    const { records } = stats;
    const target: FullRecord = records[serie - 1];
    target.value = newValue;
    stats.total = records.reduce((total, { value }) => total + value, 0);
    return target;
  }

  fetch(set: FullSet): Promise<Stats>;
  fetch(): Promise<FullRecord[]>;
  fetch(set?: FullSet): any {
    const { exercises, workouts, sets, records } = this.database;
    return this.database.transaction<Stats | FullRecord[]>(
      'r',
      [exercises, workouts, sets, records],
      () => (set ? this.fetchOne(set) : this.fetchAll())
    );
  }

  save({ set, ...record }: FullRecord): Promise<number> {
    const { records } = this.database;
    return this.database.transaction('rw', [records], () =>
      records.put({ set: set.id, ...record })
    );
  }

  delete({ id }: FullRecord): Promise<void> {
    const { records } = this.database;
    return this.database.transaction('rw', [records], () => records.delete(id));
  }

  private get all(): Dexie.Collection<LightRecord, number> {
    const { records } = this.database;
    return records.orderBy('date').reverse();
  }

  private async fetchOne(set: FullSet): Promise<Stats> {
    const { records } = this.database;
    const [lastSession] = await this.all.uniqueKeys();

    const results: LightRecord[] = lastSession
      ? await records.where({ set: set.id, date: lastSession }).toArray()
      : [];

    return results.reduce<Stats>((stats, { serie, value }) => {
      this.setSerieValue(stats, serie, value);
      return stats;
    }, this.createStats(set));
  }

  private async fetchAll(): Promise<FullRecord[]> {
    const { map } = this.database;
    return map(await this.all.toArray(), async ({ set, ...record }) => ({
      set: await this.sets.fetch(set),
      ...record
    }));
  }
}
