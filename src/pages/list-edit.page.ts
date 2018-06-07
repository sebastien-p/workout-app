import { Type } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';

import { WithId } from '../models/with-id.model';
import { Params } from './base.page';
import { ListPage } from './list.page';
import { ItemEditModalPage } from './item-edit-modal.page';

export abstract class ListEditPage
<T extends WithId, U extends any, V extends WithId = WithId>
extends ListPage<T, U, V> {
  constructor(
    alertController: AlertController,
    modalController: ModalController,
    modalPage: Type<ItemEditModalPage<T, U>>,
    service: U,
    navParams?: Params<V>
  ) {
    super(
      alertController,
      modalController,
      modalPage,
      service,
      navParams
    );
  }

  view(item: T): Modal {
    const modal: Modal = super.view(item);
    modal.onDidDismiss(() => this.refresh());
    return modal;
  }

  add(...parameters: T[keyof T][]): void {
    this.view(this.service.create(...parameters));
  }

  remove(item: T): void {
    this.confirm(() => {
      this.service.delete(item).then(() => this.refresh());
    });
  }

  reorder($event: ReorderIndexes): void {
    $event.applyTo(this.list);
  }
}
