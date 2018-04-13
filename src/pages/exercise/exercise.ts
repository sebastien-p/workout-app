import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { PageComponent } from '../page.component';
import { Exercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage extends PageComponent {
  readonly exercise: Exercise;

  constructor(
    { data: { exercise } }: NavParams,
    private readonly viewController: ViewController,
    private readonly exercisesService: ExercisesService
  ) {
    super();
    this.exercise = exercise;
  }

  dismiss(): void {
    this.viewController.dismiss();
  }

  saveExercise(exercise: Exercise): void { // FIXME
    exercise = { ...this.exercise, ...exercise };
    const method: keyof ExercisesService = exercise.id ? 'update' : 'create';
    this.exercisesService[method](exercise);
  }
}
