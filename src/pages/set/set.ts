import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { DisplaySet } from '../../models/set.model';
import { ExercisesService } from '../../services/exercises.service';
import { SetsService } from '../../services/sets.service';
import { ItemModalComponent } from '../item-modal.component';

@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage extends ItemModalComponent<DisplaySet, SetsService> {
  exercises: DisplayExercise[];

  constructor(
    navParams: NavParams,
    viewController: ViewController,
    setsService: SetsService,
    protected readonly exercisesService: ExercisesService
  ) {
    super(
      navParams,
      viewController,
      setsService
    );
  }

  ionViewDidEnter(): void {
    this.exercisesService.fetch()
      .then(exercises => this.exercises = exercises);
  }
}
