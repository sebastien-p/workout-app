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
import { Exercise } from '../../models/exercise.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ExercisesService } from '../../services/exercises.service';
import { SetPage } from '../set/set';
import { SetsService } from '../../services/sets.service';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage extends ModalComponent {
  readonly workout: Workout;
  exercises: Promise<Exercise[]>;

  constructor(
    viewController: ViewController,
    { data: { workout } }: NavParams,
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly workoutsService: WorkoutsService,
    private readonly exercisesService: ExercisesService
  ) {
    super(viewController);
    this.workout = workout;
  }

  ionViewDidEnter(): void {
    this.exercises = this.exercisesService.read();
  }

  addSet(): void {
    this.editSet(SetsService.create());
  }

  editSet(set: Set): void {
    const modal: Modal = this.modalController.create(SetPage, {
      workout: this.workout,
      set
    });
    // modal.onDidDismiss(() => this.refreshList())
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

  saveWorkout(workout: Workout): void { // FIXME
    workout = { ...this.workout, ...workout };
    const method: keyof WorkoutsService = workout.id ? 'update' : 'create';
    this.workoutsService[method](workout);
  }
}
