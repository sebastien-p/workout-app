import { TrackByFunction } from '@angular/core';

export abstract class PageComponent {
  trackById = (i: number, object: any): number => this.trackBy('id')(i, object);

  trackBy(key: string): TrackByFunction<any> {
    return (i, object) => object[key];
  }
}
