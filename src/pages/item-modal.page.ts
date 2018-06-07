import { ViewController, AlertController } from 'ionic-angular';

import { WithId } from '../models/with-id.model';
import { Params, BasePage } from './base.page';

export abstract class ItemModalPage<T extends WithId, U extends any>
extends BasePage<T, U> {
  constructor(
    navParams: Params<T>,
    protected readonly viewController: ViewController,
    alertController: AlertController,
    service: U
  ) {
    super(
      navParams,
      alertController,
      service
    );
  }

  get isNew(): boolean {
    return !this.item.id;
  }

  dismiss(confirm: boolean = false): void {
    if (confirm) { this.confirm(() => this.dismiss()); }
    else { this.viewController.dismiss(); }
  }
}
