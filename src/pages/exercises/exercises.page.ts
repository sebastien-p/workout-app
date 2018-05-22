import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ListEditPage } from '../list-edit.page';
import { ExercisePage } from '../exercise/exercise.page';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.page.html'
})
export class ExercisesPage
extends ListEditPage<DisplayExercise, ExercisesService> {
  constructor(
    alertController: AlertController,
    modalController: ModalController,
    exercisesService: ExercisesService
  ) {
    super(
      alertController,
      modalController,
      ExercisePage,
      exercisesService
    );
  }
}
