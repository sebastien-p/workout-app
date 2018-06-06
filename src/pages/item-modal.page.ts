import { ViewController } from 'ionic-angular';

import { WithId } from '../models/with-id.model';
import { Params } from './base.page';
import { ModalPage } from './modal.page';

export abstract class ItemModalPage
<T extends WithId, U extends any>
extends ModalPage<T> {
  constructor(
    navParams: Params<T>,
    viewController: ViewController,
    service: U
  ) {
    super(
      viewController,
      navParams,
      service
    );
  }

  get isNew(): boolean {
    return !this.item.id;
  }

  dismiss(...parameters: any[]): Promise<number> {
    return super.dismiss(this.item.id, ...parameters);
  }
}
