import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { FullExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ListEditPage } from '../list-edit.page';
import { AdminExercisePage } from '../admin-exercise/admin-exercise.page';

@Component({
  selector: 'page-admin-exercises',
  templateUrl: 'admin-exercises.page.html'
})
export class AdminExercisesPage
extends ListEditPage<FullExercise, ExercisesService> {
  constructor(
    alertController: AlertController,
    modalController: ModalController,
    exercisesService: ExercisesService
  ) {
    super(
      alertController,
      modalController,
      AdminExercisePage,
      exercisesService
    );
  }
}
