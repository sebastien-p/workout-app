import { TrackByFunction } from '@angular/core';

import { Identifiable } from '../models/identifiable.model';

export abstract class PageComponent {
  trackByKey<T>(key: keyof T): TrackByFunction<T> {
    return (i, item) => item[key];
  }

  trackById<T extends Identifiable = Identifiable>(): TrackByFunction<T> {
    return this.trackByKey<T>('id');
  }
}
