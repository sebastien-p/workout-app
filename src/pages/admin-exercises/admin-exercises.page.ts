import { Component } from '@angular/core';

import { FullExercise } from '../../models/exercise.model';
import { AlertService } from '../../services/alert.service';
import { ExercisesService } from '../../services/exercises.service';
import { ModalService } from '../../services/modal.service';
import { ListEditPage } from '../list-edit.page';
import { AdminExercisePage } from '../admin-exercise/admin-exercise.page';

@Component({
  selector: 'app-admin-exercises-page',
  templateUrl: 'admin-exercises.page.html'
})
export class AdminExercisesPage extends ListEditPage<
  FullExercise,
  ExercisesService
> {
  constructor(
    alertService: AlertService,
    modalService: ModalService,
    exercisesService: ExercisesService
  ) {
    super(AdminExercisePage, modalService, alertService, exercisesService);
  }
}
