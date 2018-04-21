import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { ModalComponent } from '../modal.component';
import { Workout } from '../../models/workout.model';
import { Set } from '../../models/set.model';
import { Exercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { SetsService } from '../../services/sets.service';

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
    private readonly setsService: SetsService,
    private readonly exercisesService: ExercisesService
  ) {
    super(viewController);
    this.workout = workout;
    this.set = set;
  }

  ionViewDidEnter(): void {
    this.exercises = this.exercisesService.fetch();
  }

  save(set: Set): void { // TODO + FIXME
    this.setsService.save(set).then(id => this.workout.sets.push(id))
  }
}
