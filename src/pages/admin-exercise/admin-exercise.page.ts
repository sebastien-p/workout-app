import { Component } from '@angular/core';

import { FullExercise } from '../../models/exercise.model';
import { AlertService } from '../../services/alert.service';
import { ExercisesService } from '../../services/exercises.service';
import { ModalService } from '../../services/modal.service';
import { ItemEditModalPage } from '../item-edit-modal.page';

@Component({
  selector: 'app-admin-exercise-page',
  templateUrl: 'admin-exercise.page.html'
})
export class AdminExercisePage extends ItemEditModalPage<
  FullExercise,
  ExercisesService
> {
  constructor(
    modalService: ModalService,
    alertService: AlertService,
    exercisesService: ExercisesService
  ) {
    super(modalService, alertService, exercisesService);
  }

  async removeImage(): Promise<void> {
    if (await this.alertService.confirm()) {
      const { image } = this.form.controls;
      image.setValue(undefined);
      image.markAsDirty();
    }
  }
}
