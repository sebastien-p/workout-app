import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { ModalComponent } from './modal.component';

export interface Params<T> extends NavParams {
  data: { item: T };
};

export abstract class ItemModalComponent<T extends Identifiable, U extends any>
extends ModalComponent {
  item: T;

  @ViewChild(NgForm)
  protected readonly form: NgForm;

  constructor(
    viewController: ViewController,
    { data: { item } }: Params<T>,
    protected readonly service: U
  ) {
    super(viewController);
    this.item = item;
  }

  get canSubmit(): boolean {
    const { dirty, valid } = this.form;
    return dirty && valid;
  }

  submit() : void {
    if (this.canSubmit) { this.save().then(() => this.dismiss()); }
  }

  protected save(): Dexie.Promise<number> { // TODO
    // this.service.save({ ...this.item, ...item });
    return this.service.save(Object.assign({}, this.item, this.form.value));
  }
}
