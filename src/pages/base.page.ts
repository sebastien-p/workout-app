import { NavParams, AlertController, Alert } from 'ionic-angular';

import {
  AlertInputOptions
} from 'ionic-angular/components/alert/alert-options';

import { WithId } from '../models/with-id.model';
import { BaseComponent } from '../components/base.component';

export type Data<T extends WithId = WithId> = { item: T };
export type AlertValue<T> = { value: T };

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

  confirm(): Promise<boolean> {
    return this.alert<boolean>('Are you sure?', 'Yes', 'No')
      .then(alert => !!alert);
  }

  prompt(
    title: string,
    type: string = 'text',
    placeholder: string = ''
  ): Promise<string> {
    return this.alert<string>(title, 'Save', 'Cancel', { type, placeholder })
      .then(alert => alert && alert.value);
  }

  protected alert<V>(
    title: string,
    resolveButton: string,
    rejectButton: string,
    input?: AlertInputOptions
  ): Promise<AlertValue<V>> {
    return new Promise<AlertValue<V>>((resolve, reject) => {
      const alert: Alert = this.alertController.create({
        buttons: [
          { text: rejectButton, handler: () => resolve(null) },
          { text: resolveButton, handler: value => resolve({ value }) }
        ],
        inputs: input ? [{ ...input, name: 'value' }] : null,
        enableBackdropDismiss: false,
        title
      });
      alert.present().catch(reject);
    });
  }
}
