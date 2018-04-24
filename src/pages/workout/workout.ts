import { Component } from '@angular/core';

import {
  AlertController,
  Modal,
  ModalController,
  NavParams,
  ViewController
} from 'ionic-angular';

import { DisplaySet } from '../../models/set.model';
import { DisplayWorkout } from '../../models/workout.model';
import { ModalComponent } from '../modal.component';
import { SetPage } from '../set/set';
import { SetsService } from '../../services/sets.service';
import { WorkoutsService } from '../../services/workouts.service';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage extends ModalComponent {
  workout: DisplayWorkout;

  constructor(
    viewController: ViewController,
    { data: { workout } }: NavParams,
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly workoutsService: WorkoutsService,
    private readonly setsService: SetsService
  ) {
    super(viewController);
    this.workout = workout;
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  refresh(): void { // FIXME
    if (!this.workout.id) { return; }
    this.workoutsService.fetch(this.workout.id)
      .then(workout => this.workout = workout);
  }

  addSet(): void {
    this.editSet(this.setsService.create());
  }

  editSet(set: DisplaySet): void {
    const modal: Modal = this.modalController.create(SetPage, {
      workout: this.workout,
      set
    });
    modal.onDidDismiss(() => this.refresh())
    modal.present();
  }

  removeSet(set: DisplaySet): void {
    this.alertController.create({
      title: `Delete "TODO"?`,
      buttons: [
        { text: 'Yes', handler: () => console.log('OK') },
        { text: 'No' }
      ]
    }).present();
  }

  save(workout: DisplayWorkout): void { // FIXME
    this.workoutsService.save({ ...this.workout, ...workout });
  }
}
