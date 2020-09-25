import { Component } from '@angular/core';

import { FullWorkout } from '../../models/workout.model';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ListEditPage } from '../list-edit.page';
import { AdminWorkoutPage } from '../admin-workout/admin-workout.page';

@Component({
  selector: 'app-admin-workouts-page',
  templateUrl: 'admin-workouts.page.html'
})
export class AdminWorkoutsPage extends ListEditPage<
  FullWorkout,
  WorkoutsService
> {
  constructor(
    alertService: AlertService,
    modalService: ModalService,
    workoutsService: WorkoutsService
  ) {
    super(AdminWorkoutPage, modalService, alertService, workoutsService);
  }
}
