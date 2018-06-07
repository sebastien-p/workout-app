import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ItemEditModalPage } from '../item-edit-modal.page';

@Component({
  selector: 'page-admin-exercise',
  templateUrl: 'admin-exercise.page.html'
})
export class AdminExercisePage
extends ItemEditModalPage<DisplayExercise, ExercisesService> {
  constructor(
    navParams: NavParams,
    viewController: ViewController,
    alertController: AlertController,
    exercisesService: ExercisesService
  ) {
    super(
      navParams,
      viewController,
      alertController,
      exercisesService
    );
  }
}
