import { Type } from '@angular/core';
import { AlertController, ModalController, Alert, Modal } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { ItemModalComponent } from './item-modal.component';
import { PageComponent, Params } from './page.component';

export abstract class ListPageComponent
<T extends Identifiable, U extends any, V extends Identifiable = Identifiable>
extends PageComponent<V> {
  list: T[];

  constructor(
    protected readonly alertController: AlertController,
    protected readonly modalController: ModalController,
    protected readonly modalPage: Type<ItemModalComponent<T, U>>,
    service: U,
    navParams?: Params<V>
  ) {
    super(
      navParams,
      service
    );
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  add(...parameters: T[keyof T][]): void {
    this.edit(this.service.create(...parameters));
  }

  edit(item: T): void {
    const modal: Modal = this.modalController.create(this.modalPage, { item });
    modal.onDidDismiss(() => this.refresh());
    modal.present();
  }

  remove(item: T): void {
    const alert: Alert = this.alertController.create({
      title: "Delete?",
      buttons: [
        { text: 'Yes', handler: () => { this.delete(item); } },
        { text: 'No' }
      ]
    });
    alert.present();
  }

  reorder($event: ReorderIndexes): void {
    $event.applyTo(this.list);
  }

  protected refresh(): Dexie.Promise<T[]> {
    return this.service.fetch().then(list => this.list = list);
  }

  protected delete(item: T): Dexie.Promise<number> {
    return this.service.delete(item).then(() => this.refresh());
  }
}
