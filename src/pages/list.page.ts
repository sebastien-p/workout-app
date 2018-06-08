import { Type } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';
import Dexie from 'dexie';

import { WithId } from '../models/with-id.model';
import { BasePage, Params } from './base.page';
import { ItemModalPage } from './item-modal.page';

export abstract class ListPage
<T extends WithId, U extends any, V extends WithId = WithId>
extends BasePage<V> {
  list: T[];

  constructor(
    alertController: AlertController,
    protected readonly modalController: ModalController,
    protected readonly modalPage: Type<ItemModalPage<T, U>>,
    service: U,
    navParams?: Params<V>
  ) {
    super(
      navParams,
      alertController,
      service
    );
  }

  ionViewDidEnter(): void {
    this.refresh(true);
  }

  view(item: T): Modal {
    const modal: Modal = this.modalController.create(this.modalPage, { item });
    modal.present();
    return modal;
  }

  protected refresh(enter: boolean = false): Dexie.Promise<T[]> {
    return this.service.fetch().then(list => this.list = list);
  }
}
