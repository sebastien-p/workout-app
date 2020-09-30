import { Directive } from '@angular/core';
import { WithId } from '../models/with-id.model';
import { AlertService } from '../services/alert.service';
import { ModalService } from '../services/modal.service';
import { BasePage } from './page';

// FIXME
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ItemModalPage<
  T extends WithId,
  U extends any // FIXME
> extends BasePage<T, U> {
  constructor(
    modalService: ModalService,
    alertService: AlertService,
    service: U
  ) {
    super(modalService, alertService, service);
  }

  get isNew(): boolean {
    return !this.item.id;
  }

  async dismiss(skipConfirm: boolean = false): Promise<boolean> {
    return (
      (skipConfirm || (await this.alertService.confirm())) &&
      this.modalService.dismiss()
    );
  }
}
