import { Directive, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WithId } from '../models/with-id.model';
import { ItemModalPage } from './item-modal.page';

// FIXME
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ItemEditModalPage<
  T extends WithId,
  U extends any // FIXME
> extends ItemModalPage<T, U> {
  @ViewChild(NgForm, { static: true })
  readonly form: NgForm;

  get value(): Partial<T> {
    return this.form.value;
  }

  get canSubmit(): boolean {
    const { dirty, valid } = this.form;
    return dirty && valid;
  }

  reset(): void {
    this.form.reset(this.value);
  }

  async submit(): Promise<void> {
    if (this.canSubmit) {
      await this.save();
      await this.dismiss(true);
    }
  }

  protected save(value: Partial<T> = this.value): Promise<number> {
    return (this.service as any).save({ ...this.item, ...value }); // FIXME
  }
}
