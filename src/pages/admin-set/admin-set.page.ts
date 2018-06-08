import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { FullExercise } from '../../models/exercise.model';
import { FullSet } from '../../models/set.model';
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
export class AdminSetPage extends ItemEditModalPage<FullSet, SetsService> {
  readonly amplitudes: Keys<typeof Amplitude> = this.spreadEnum(Amplitude);
  readonly rythms: Keys<typeof Rythm> = this.spreadEnum(Rythm);
  exercises: FullExercise[];

  constructor(
    navParams: NavParams,
    viewController: ViewController,
    alertController: AlertController,
    setsService: SetsService,
    private readonly exercisesService: ExercisesService
  ) {
    super(
      navParams,
      viewController,
      alertController,
      setsService
    );
  }

  ionViewDidEnter(): void {
    this.exercisesService.fetch().then(data => this.exercises = data);
  }
}
