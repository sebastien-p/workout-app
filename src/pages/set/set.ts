import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { ModalComponent } from '../modal.component';
import { Workout } from '../../models/workout.model';
import { Set } from '../../models/set.model';
import { WorkoutsService } from '../../services/workouts.service';
import { Exercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage extends ModalComponent {
  private readonly workout: Workout;
  readonly set: Set;
  exercises: Promise<Exercise[]>;

  constructor(
    viewController: ViewController,
    { data: { workout, set } }: NavParams,
    private readonly workoutsService: WorkoutsService,
    private readonly exercisesService: ExercisesService
  ) {
    super(viewController);
    this.workout = workout;
    this.set = set;
  }

  ionViewDidEnter(): void {
    this.exercises = this.exercisesService.read();
  }

  dismiss(): void {
    this.viewController.dismiss();
  }

  saveWorkout(set: Set): void { // TODO + FIXME
    this.workout.sets.push(set.id);
    const method: keyof WorkoutsService = this.workout.id ? 'update' : 'create';
    this.workoutsService[method](this.workout);
  }
}
