import { TrackByFunction } from '@angular/core';

import { Identifiable } from '../models/identifiable.model';

export type CompareFunction<T> = (itemA: T, itemB: T) => boolean;
export type Keys<T extends {}> = (keyof T)[];

export abstract class BaseComponent {
  trackByKey<T>(key: keyof T): TrackByFunction<T> {
    return (index, item) => item[key];
  }

  trackById<T extends Identifiable = Identifiable>(): TrackByFunction<T> {
    return this.trackByKey<T>('id');
  }

  compareByKey<T>(key: keyof T): CompareFunction<T> {
    return (itemA, itemB) => itemA[key] === itemB[key];
  }

  compareById<T extends Identifiable = Identifiable>(): CompareFunction<T> {
    return this.compareByKey('id');
  }

  spreadEnum<T extends {}>(value: T): Keys<typeof value> {
    const keys: Keys<typeof value> = Object.keys(value) as any;
    return keys.slice(keys.length / 2);
  }
}
