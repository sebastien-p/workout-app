import { NavParams, AlertController, Alert } from 'ionic-angular';

import { WithId } from '../models/with-id.model';
import { BaseComponent } from '../components/base.component';

export type Data<T extends WithId = WithId> = {
  item: T;
};

type PromptParameter = { value: string };
type AlertHandler<T> = (parameter?: T) => void;

export class Params<T extends WithId = WithId> extends NavParams {
  data: Data<T>;
}

export abstract class BasePage<T extends WithId = WithId, U extends any = any>
extends BaseComponent {
  readonly data: Data<T>;

  constructor(
    { data }: Params<T> = new Params({ item: null }),
    protected readonly alertController: AlertController,
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

  confirm(handler: AlertHandler<void>): void {
    const alert: Alert = this.alertController.create({
      buttons: [{ text: 'No' }, { text: 'Yes', handler }],
      title: 'Are you sure?'
    });
    alert.present();
  }

  prompt(
    title: string,
    handler: AlertHandler<PromptParameter>,
    type: string = 'text',
    placeholder?: string
  ): void {
    const alert: Alert = this.alertController.create({
      buttons: [{ text: 'Cancel' }, { text: 'Save', handler }],
      inputs: [{ name: 'value', type, placeholder }],
      title
    });
    alert.present();
  }
}
