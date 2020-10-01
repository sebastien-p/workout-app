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
    serie: number = 1,
    value: number = 0,
    date: string = this.dateService.getISODate()
  ): FullRecord {
    return { set, serie, value, date };
  }

  createStats(series: number = 1): Stats {
    return { values: Array(series).fill(0), total: 0 };
  }

  createStatsTuple(set: FullSet): [Stats, Promise<Stats>] {
    return [this.createStats(set.series), this.fetch(set)];
  }

  setSerieValue(stats: Stats, serie: number, value: number): void {
    const { values } = stats;
    values[serie - 1] = value;
    stats.total = values.reduce((total, current) => total + current, 0);
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

  private async fetchOne({ id, series }: FullSet): Promise<Stats> {
    const { records } = this.database;
    const [lastSession] = await this.all.uniqueKeys();

    const results: LightRecord[] = lastSession
      ? await records.where({ set: id, date: lastSession }).toArray()
      : [];

    return results.reduce<Stats>((stats, { serie, value }) => {
      this.setSerieValue(stats, serie, value);
      return stats;
    }, this.createStats(series));
  }

  private async fetchAll(): Promise<FullRecord[]> {
    const { map } = this.database;
    return map(await this.all.toArray(), async ({ set, ...record }) => ({
      set: await this.sets.fetch(set),
      ...record
    }));
  }
}
