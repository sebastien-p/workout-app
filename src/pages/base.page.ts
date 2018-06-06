import { NavParams } from 'ionic-angular';

import { WithId } from '../models/with-id.model';
import { BaseComponent } from '../components/base.component';

export interface Data<T extends WithId = WithId> {
  item: T;
}

export class Params
<T extends WithId = WithId>
extends NavParams {
  data: Data<T>;
}

export abstract class BasePage
<T extends WithId = WithId, U extends any = any>
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
