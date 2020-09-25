import { Component } from '@angular/core';

import { FullWorkout } from '../../models/workout.model';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListPage } from '../list.page';
import { TrainingWorkoutPage } from '../training-workout/training-workout.page';

@Component({
  selector: 'app-training-workouts-page',
  templateUrl: 'training-workouts.page.html'
})
export class TrainingWorkoutsPage extends ListPage<
  FullWorkout,
  WorkoutsService
> {
  constructor(
    modalService: ModalService,
    alertService: AlertService,
    workoutsService: WorkoutsService
  ) {
    super(TrainingWorkoutPage, modalService, alertService, workoutsService);
  }
}
