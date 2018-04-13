import { TrackByFunction } from '@angular/core';

export abstract class PageComponent {
  trackBy(key: string): TrackByFunction<any> {
    return (index, object) => object[key];
  }
}
