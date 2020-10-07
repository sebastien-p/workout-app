import { Component, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

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
  @ViewChild(IonItemSliding, { static: true })
  private readonly imageItemSliding: IonItemSliding;

  constructor(
    modalService: ModalService,
    alertService: AlertService,
    exercisesService: ExercisesService
  ) {
    super(modalService, alertService, exercisesService);
  }

  async removeImage(): Promise<void> {
    if (await this.alertService.confirm()) {
      await this.imageItemSliding.close();

      const { image } = this.form.controls;
      image.setValue(undefined);
      image.markAsDirty();
    }
  }
}
