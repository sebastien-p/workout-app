import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { DisplaySet } from '../../models/set.model';
import { ModalComponent } from '../modal.component';
import { ExercisesService } from '../../services/exercises.service';
import { SetsService } from '../../services/sets.service';

@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage extends ModalComponent {
  readonly set: DisplaySet;
  exercises: Promise<DisplayExercise[]>;

  constructor(
    viewController: ViewController,
    { data: { set } }: NavParams,
    private readonly exercisesService: ExercisesService,
    private readonly setsService: SetsService
  ) {
    super(viewController);
    this.set = set;
  }

  ionViewDidEnter(): void {
    this.exercises = this.exercisesService.fetch();
  }

  save(set: DisplaySet): void { // TODO + FIXME
    this.setsService.save({ ...this.set, ...set });
  }
}
