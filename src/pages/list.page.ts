import { Directive, Type } from '@angular/core';

import { WithId } from '../models/with-id.model';
import { AlertService } from '../services/alert.service';
import { ModalService } from '../services/modal.service';
import { BasePage } from './page';
import { ItemModalPage } from './item-modal.page';

// FIXME
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ListPage<
  T extends WithId,
  U extends any, // FIXME
  V extends WithId = WithId
> extends BasePage<V> {
  list: T[];

  constructor(
    protected readonly modalPage: Type<ItemModalPage<T, U>>,
    modalService: ModalService,
    alertService: AlertService,
    service: U
  ) {
    super(modalService, alertService, service);
  }

  ionViewDidEnter(): void {
    this.refresh(true);
  }

  async view(item: T): Promise<void> {
    await this.modalService.modal(this.modalPage, { data: { item } });
    this.refresh();
  }

  protected async refresh(enter: boolean = false): Promise<void> {
    this.list = await this.service.fetch();
  }
}
