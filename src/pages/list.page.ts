import { Type } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { BasePage, Params } from './base.page';
import { ItemModalPage } from './item-modal.page';

export abstract class ListPage
<T extends Identifiable, U extends any, V extends Identifiable = Identifiable>
extends BasePage<V> {
  list: T[];

  constructor(
    protected readonly modalController: ModalController,
    protected readonly modalPage: Type<ItemModalPage<T, U>>,
    service: U,
    navParams?: Params<V>
  ) {
    super(
      navParams,
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
