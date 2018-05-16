import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { ModalComponent } from './modal.component';
import { Params } from './page.component';

export abstract class ItemModalComponent
<T extends Identifiable, U extends any>
extends ModalComponent<T> {
  @ViewChild(NgForm)
  readonly form: NgForm;

  constructor(
    navParams: Params<T>,
    viewController: ViewController,
    service: U
  ) {
    super(
      viewController,
      navParams,
      service
    );
  }

  get value(): Partial<T> {
    return this.form.value;
  }

  get canSubmit(): boolean {
    const { dirty, valid } = this.form;
    return dirty && valid;
  }

  get isNew(): boolean {
    return !this.item.id;
  }

  dismiss(...parameters: any[]): Promise<number> {
    return super.dismiss(this.item.id, ...parameters);
  }

  reset(): void {
    this.form.reset(this.value);
  }

  submit() : void {
    if (this.canSubmit) { this.save().then(() => this.dismiss()); }
  }

  protected save(): Dexie.Promise<number> { // FIXME
    return this.service.save({ ...this.item as any, ...this.value as any });
  }
}
