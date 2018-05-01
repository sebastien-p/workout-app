import { Type } from '@angular/core';
import { AlertController, Alert, ModalController, Modal } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { PageComponent } from './page.component';
import { ItemModalComponent, Params, Data } from './item-modal.component';

export abstract class ListPageComponent<T extends Identifiable, U extends any>
extends PageComponent {
  list: T[];
  protected readonly data: Data;

  constructor(
    protected readonly alertController: AlertController,
    protected readonly modalController: ModalController,
    protected readonly modal: Type<ItemModalComponent<T, U>>,
    protected readonly service: U,
    { data }: Params = {} as Params
  ) {
    super();
    this.data = data;
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  add(...parameters: T[keyof T][]): void {
    this.edit(this.service.create(...parameters));
  }

  edit(item: T): void {
    const modal: Modal = this.modalController.create(this.modal, { item });
    modal.onDidDismiss(() => this.refresh());
    modal.present();
  }

  remove(item: T): void {
    const alert: Alert = this.alertController.create({
      title: `Delete "${item.id}"?`,
      buttons: [
        { text: 'Yes', handler: () => { this.delete(item); } },
        { text: 'No' }
      ]
    });
    alert.present();
  }

  protected refresh(): Dexie.Promise<T[]> {
    return this.service.fetch().then(list => this.list = list);
  }

  protected delete(item: T): Dexie.Promise<number> {
    return this.service.delete(item).then(() => this.refresh());
  }
}
