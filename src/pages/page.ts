import { Directive, Input } from '@angular/core';

import { WithId } from '../models/with-id.model';
import { BaseComponent } from '../components/component';
import { AlertService } from '../services/alert.service';
import { ModalService } from '../services/modal.service';

export interface Data<T extends WithId = WithId> {
  item?: T;
}

// FIXME
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BasePage<
  T extends WithId = WithId,
  U extends any = any // FIXME
> extends BaseComponent {
  @Input()
  readonly data: Data<T> = {};

  constructor(
    protected readonly modalService: ModalService,
    protected readonly alertService: AlertService,
    protected readonly service?: U // FIXME
  ) {
    super();
  }

  get item(): T | undefined {
    return this.data.item;
  }

  set item(item: T | undefined) {
    this.data.item = item;
  }
}
