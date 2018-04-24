import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage extends ModalComponent {
  readonly exercise: DisplayExercise;

  constructor(
    viewController: ViewController,
    { data: { exercise } }: NavParams,
    private readonly exercisesService: ExercisesService
  ) {
    super(viewController);
    this.exercise = exercise;
  }

  save(exercise: DisplayExercise): void { // FIXME
    this.exercisesService.save({ ...this.exercise, ...exercise });
  }
}
