import { Type } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

import { WithId } from '../models/with-id.model';
import { AlertService } from '../services/alert.service';
import { ModalService } from '../services/modal.service';
import { ItemEditModalPage } from './item-edit-modal.page';
import { ListPage } from './list.page';

export abstract class ListEditPage<
  T extends WithId,
  U extends any, // FIXME
  V extends WithId = WithId
> extends ListPage<T, U, V> {
  constructor(
    modalPage: Type<ItemEditModalPage<T, U>>,
    modalService: ModalService,
    alertService: AlertService,
    service: U
  ) {
    super(modalPage, modalService, alertService, service);
  }

  add(...parameters: T[keyof T][]): Promise<void> {
    return this.view(this.service.create(...parameters));
  }

  async remove(item: T): Promise<boolean> {
    const remove: boolean = await this.alertService.confirm();

    if (remove) {
      await this.service.delete(item);
      await this.refresh();
    }

    return remove;
  }

  reorder(detail: ItemReorderEventDetail): void {
    detail.complete(this.list);
  }
}
