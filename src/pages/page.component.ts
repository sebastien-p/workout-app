import { TrackByFunction } from '@angular/core';

import { Identifiable } from '../models/identifiable.model';

export type CompareFunction<T> = (itemA: T, itemB: T) => boolean;

export abstract class PageComponent {
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
}
