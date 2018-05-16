import { NavParams } from 'ionic-angular';

import { Identifiable } from '../models/identifiable.model';
import { BaseComponent } from './base.component';

export interface Data<T extends Identifiable = Identifiable> {
  item: T;
}

export class Params<T extends Identifiable = Identifiable>
extends NavParams {
  data: Data<T>;
}

export abstract class PageComponent
<T extends Identifiable = Identifiable, U extends any = any>
extends BaseComponent {
  readonly data: Data<T>;

  constructor(
    { data }: Params<T> = new Params({ item: null }),
    protected readonly service: U = null
  ) {
    super();
    this.data = data;
  }

  get item(): T {
    return this.data.item;
  }

  set item(item: T) {
    this.data.item = item;
  }
}
