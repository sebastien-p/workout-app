import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ListPageComponent } from '../list-page.component';
import { ExercisePage } from '../exercise/exercise';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage
extends ListPageComponent<DisplayExercise, ExercisesService> {
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
