import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ItemModalComponent } from '../item-modal.component';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage
extends ItemModalComponent<DisplayExercise, ExercisesService> {
  constructor(
    navParams: NavParams,
    viewController: ViewController,
    exercisesService: ExercisesService
  ) {
    super(
      navParams,
      viewController,
      exercisesService
    );
  }
}
