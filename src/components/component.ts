import { Directive } from '@angular/core';
import { WithId } from '../models/with-id.model';

export type Keys<T extends {}> = (keyof T)[];

// FIXME
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseComponent {
  trackByIndex(index: number) {
    return index;
  }

  trackById(index: number, item: WithId): WithId['id'] {
    return item.id;
  }

  compareById(itemA: WithId, itemB: WithId): boolean {
    return itemA.id === itemB.id;
  }

  spreadEnum<T extends {}>(value: T): Keys<T> {
    const keys: Keys<T> = Object.keys(value) as Keys<T>;
    return keys.slice(keys.length / 2);
  }
}
