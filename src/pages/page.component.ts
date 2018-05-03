import { TrackByFunction } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Identifiable } from '../models/identifiable.model';

export interface Data<T extends Identifiable = Identifiable> {
  item: T;
}

export class Params<T extends Identifiable = Identifiable>
extends NavParams {
  data: Data<T>;
}

export type CompareFunction<T> = (itemA: T, itemB: T) => boolean;

export abstract class PageComponent
<T extends Identifiable = Identifiable, U extends any = any> {
  readonly data: Data<T>;

  constructor(
    { data }: Params<T> = new Params({ item: null }),
    protected readonly service: U = null
  ) {
    this.data = data;
  }

  get item(): T {
    return this.data.item;
  }

  set item(item: T) {
    this.data.item = item;
  }

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
