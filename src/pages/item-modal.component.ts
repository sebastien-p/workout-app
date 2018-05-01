import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';
import { Dexie } from 'dexie';

import { Identifiable } from '../models/identifiable.model';
import { ModalComponent } from './modal.component';

export interface Data<T extends Identifiable = Identifiable> {
  item: T;
}

export interface Params<T extends Identifiable = Identifiable>
extends NavParams {
  data: Data<T>;
};

export abstract class ItemModalComponent<T extends Identifiable, U extends any>
extends ModalComponent {
  data: Data<T>;

  @ViewChild(NgForm)
  protected readonly form: NgForm;

  constructor(
    { data }: Params<T>,
    viewController: ViewController,
    protected readonly service: U
  ) {
    super(viewController);
    this.data = data;
  }

  get item(): T {
    return this.data.item;
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

  protected save(): Dexie.Promise<number> { // TODO
    return this.service.save({ ...this.item as any, ...this.value as any });
  }
}
