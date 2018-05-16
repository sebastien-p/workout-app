import { ViewController } from 'ionic-angular';

import { Identifiable } from '../models/identifiable.model';
import { PageComponent, Params } from './page.component';

export abstract class ModalComponent
<T extends Identifiable = Identifiable, U extends any = any>
extends PageComponent<T> {
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
