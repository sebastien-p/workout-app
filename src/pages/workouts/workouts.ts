import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { DisplayWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ListPageComponent } from '../list-page.component';
import { WorkoutPage } from '../workout/workout';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage
extends ListPageComponent<DisplayWorkout, WorkoutsService> {
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

  getIcon({ auto }: DisplayWorkout): string {
    return auto ? 'stopwatch' : 'hand';
  }
}
