import { ViewController } from 'ionic-angular';

import { Identifiable } from '../models/identifiable.model';
import { BasePage, Params } from './base.page';

export abstract class ModalPage
<T extends Identifiable = Identifiable, U extends any = any>
extends BasePage<T> {
  constructor(
    protected readonly viewController: ViewController,
    navParams?: Params<T>,
    service?: U
  ) {
    super(
      navParams,
      service
    );
  }

  dismiss(...parameters: any[]): Promise<any> {
    return this.viewController.dismiss(...parameters);
  }
}
