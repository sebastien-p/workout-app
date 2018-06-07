import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dexie } from 'dexie';

import { WithId } from '../models/with-id.model';
import { ItemModalPage } from './item-modal.page';

export abstract class ItemEditModalPage<T extends WithId, U extends any>
extends ItemModalPage<T, U> {
  @ViewChild(NgForm)
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

  submit() : void {
    if (this.canSubmit) { this.save().then(() => this.dismiss()); }
  }

  protected save(): Dexie.Promise<number> {
    return this.service.save({ ...this.item as any, ...this.value as any });
  }
}
