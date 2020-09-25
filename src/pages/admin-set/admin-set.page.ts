import { Component } from '@angular/core';

import { Amplitude } from '../../models/amplitude.enum';
import { FullExercise } from '../../models/exercise.model';
import { Rythm } from '../../models/rythm.enum';
import { FullSet } from '../../models/set.model';
import { Keys } from '../../components/component';
import { AlertService } from '../../services/alert.service';
import { ExercisesService } from '../../services/exercises.service';
import { ModalService } from '../../services/modal.service';
import { SetsService } from '../../services/sets.service';
import { ItemEditModalPage } from '../item-edit-modal.page';

@Component({
  selector: 'app-admin-set-page',
  templateUrl: 'admin-set.page.html'
})
export class AdminSetPage extends ItemEditModalPage<FullSet, SetsService> {
  readonly amplitudes: Keys<typeof Amplitude> = this.spreadEnum(Amplitude);
  readonly rythms: Keys<typeof Rythm> = this.spreadEnum(Rythm);

  exercises?: FullExercise[];

  constructor(
    private readonly exercisesService: ExercisesService,
    modalService: ModalService,
    alertService: AlertService,
    setsService: SetsService
  ) {
    super(modalService, alertService, setsService);
  }

  async ionViewWillEnter(): Promise<void> {
    this.exercises = await this.exercisesService.fetch();
  }
}
