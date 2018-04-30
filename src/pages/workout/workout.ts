import { Component } from '@angular/core';

import {
  AlertController,
  ModalController,
  Modal,
  NavParams,
  ViewController
} from 'ionic-angular';

import { Dexie } from 'dexie';

import { DisplaySet } from '../../models/set.model';
import { DisplayWorkout } from '../../models/workout.model';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemModalComponent } from '../item-modal.component';
import { SetPage } from '../set/set';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage
extends ItemModalComponent<DisplayWorkout, WorkoutsService> {
  constructor(
    viewController: ViewController,
    navParams: NavParams,
    workoutsService: WorkoutsService,
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly setsService: SetsService
  ) {
    super(
      viewController,
      navParams,
      workoutsService
    );
  }

  ionViewDidEnter(): void {
    if (this.item.id) { this.refresh(); }
  }

  private reallyDelete(set: DisplaySet): void {
    this.setsService.delete(set).then(() => this.refresh());
  }

  refresh(): void { // FIXME
    this.service.fetch(this.item.id).then(workout => this.item = workout);
  }

  addSet(): void {
    this.editSet(this.setsService.create(this.item.id));
  }

  editSet(set: DisplaySet): void {
    const modal: Modal = this.modalController.create(SetPage, { item: set });
    modal.onDidDismiss(() => this.refresh())
    modal.present();
  }

  removeSet(set: DisplaySet): void {
    this.alertController.create({
      title: `Delete "TODO"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDelete(set) },
        { text: 'No' }
      ]
    }).present();
  }

  submit(): void { // TODO
    // super.submit();
    if (!this.canSubmit) { return; }
    this.save().then(id => {
      this.form.reset(this.form.value);
      if (this.item.id) { this.dismiss(); }
      else {
        this.item.id = id;
        this.refresh();
      }
    })
  }

  // save(): Dexie.Promise<number> { // FIXME
  //   return super.save().then(id => {
  //     if (this.item.id) { return id; }
  //     this.item.id = id;
  //     this.refresh();
  //     return id;
  //   });
  // }
}
