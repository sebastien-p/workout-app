import { Component } from '@angular/core';

import {
  AlertController,
  Modal,
  ModalController,
  NavParams,
  ViewController
} from 'ionic-angular';

import { ModalComponent } from '../modal.component';
import { Workout } from '../../models/workout.model';
import { Set } from '../../models/set.model';
import { WorkoutsService } from '../../services/workouts.service';
import { SetPage } from '../set/set';
import { SetsService } from '../../services/sets.service';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage extends ModalComponent {
  readonly workout: Workout;
  sets: Promise<Set[]>;

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
    this.refreshSets();
  }

  refreshSets(): void {
    this.sets = this.workoutsService.fetchSets(this.workout.sets); // FIXME
  }

  addSet(): void {
    this.editSet(this.setsService.create());
  }

  editSet(set: Set): void {
    const modal: Modal = this.modalController.create(SetPage, {
      workout: this.workout,
      set
    });
    modal.onDidDismiss(() => this.refreshSets())
    modal.present();
  }

  removeSet(set: Set): void {
    this.alertController.create({
      title: `Delete "TODO"?`,
      buttons: [
        { text: 'Yes', handler: () => console.log('OK') },
        { text: 'No' }
      ]
    }).present();
  }

  save(workout: Workout): void { // FIXME
    this.workoutsService.save({ ...this.workout, ...workout });
  }
}
