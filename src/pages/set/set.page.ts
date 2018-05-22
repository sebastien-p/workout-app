import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Amplitude } from '../../models/amplitude.enum';
import { Rythm } from '../../models/rythm.enum';
import { DisplayExercise } from '../../models/exercise.model';
import { DisplaySet } from '../../models/set.model';
import { ExercisesService } from '../../services/exercises.service';
import { SetsService } from '../../services/sets.service';
import { Keys } from '../../components/base.component';
import { ItemModalComponent } from '../../components/item-modal.component';

@Component({
  selector: 'page-set',
  templateUrl: 'set.page.html'
})
export class SetPage
extends ItemModalComponent<DisplaySet, SetsService> {
  exercises: DisplayExercise[];

  readonly amplitudes: Keys<typeof Amplitude> = this.spreadEnum(Amplitude);
  readonly rythms: Keys<typeof Rythm> = this.spreadEnum(Rythm);

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
