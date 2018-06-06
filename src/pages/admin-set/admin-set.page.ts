import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { DisplaySet } from '../../models/set.model';
import { Amplitude } from '../../models/amplitude.enum';
import { Rythm } from '../../models/rythm.enum';
import { ExercisesService } from '../../services/exercises.service';
import { SetsService } from '../../services/sets.service';
import { Keys } from '../../components/base.component';
import { ItemEditModalPage } from '../item-edit-modal.page';

@Component({
  selector: 'page-admin-set',
  templateUrl: 'admin-set.page.html'
})
export class AdminSetPage
extends ItemEditModalPage<DisplaySet, SetsService> {
  readonly amplitudes: Keys<typeof Amplitude> = this.spreadEnum(Amplitude);
  readonly rythms: Keys<typeof Rythm> = this.spreadEnum(Rythm);

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
