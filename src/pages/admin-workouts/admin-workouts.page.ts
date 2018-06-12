import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { FullWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ListEditPage } from '../list-edit.page';
import { AdminWorkoutPage } from '../admin-workout/admin-workout.page';

@Component({
  selector: 'page-admin-workouts',
  templateUrl: 'admin-workouts.page.html'
})
export class AdminWorkoutsPage
extends ListEditPage<FullWorkout, WorkoutsService> {
  constructor(
    alertController: AlertController,
    modalController: ModalController,
    workoutsService: WorkoutsService
  ) {
    super(
      alertController,
      modalController,
      AdminWorkoutPage,
      workoutsService
    );
  }
}
