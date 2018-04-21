import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ModalComponent } from '../modal.component';
import { Exercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage extends ModalComponent {
  readonly exercise: Exercise;

  constructor(
    viewController: ViewController,
    { data: { exercise } }: NavParams,
    private readonly exercisesService: ExercisesService
  ) {
    super(viewController);
    this.exercise = exercise;
  }

  save(exercise: Exercise): void { // FIXME
    this.exercisesService.save({ ...this.exercise, ...exercise });
  }
}
