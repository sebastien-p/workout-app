import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { DisplayWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ListEditPage } from '../list-edit.page';
import { WorkoutPage } from '../workout/workout.page';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.page.html'
})
export class WorkoutsPage
extends ListEditPage<DisplayWorkout, WorkoutsService> {
  constructor(
    alertController: AlertController,
    modalController: ModalController,
    workoutsService: WorkoutsService
  ) {
    super(
      alertController,
      modalController,
      WorkoutPage,
      workoutsService
    );
  }
}
