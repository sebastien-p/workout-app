import { Type } from '@angular/core';
import { AlertController, Alert, ModalController, Modal } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Nameable } from '../models/nameable.model';
import { PageComponent } from './page.component';
import { ItemModalComponent } from './item-modal.component';

export abstract class ListPageComponent<T extends Nameable, U extends any>
extends PageComponent {
  list: T[];

  constructor(
    protected readonly alertController: AlertController,
    protected readonly modalController: ModalController,
    protected readonly modal: Type<ItemModalComponent<T, U>>,
    protected readonly service: U
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  protected refresh(): Dexie.Promise<T[]> {
    return this.service.fetch().then(list => this.list = list);
  }

  protected delete(item: T): Dexie.Promise<number> {
    return this.service.delete(item).then(() => this.refresh());
  }

  add(...parameters: any[]): void {
    this.edit(this.service.create(...parameters));
  }

  edit(item: T): void {
    const modal: Modal = this.modalController.create(this.modal, { item });
    modal.onDidDismiss(() => this.refresh());
    modal.present();
  }

  remove(item: T): void {
    const alert: Alert = this.alertController.create({
      title: `Delete "${item.name}"?`,
      buttons: [
        { text: 'Yes', handler: () => { this.delete(item); } },
        { text: 'No' }
      ]
    });
    alert.present();
  }
}
