import { Component } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

import { Amplitude } from '../../models/amplitude.enum';
import { FullExercise } from '../../models/exercise.model';
import { Mode } from '../../models/mode.enum';
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
  readonly modes: Keys<typeof Mode> = this.spreadEnum(Mode);

  exercises?: FullExercise[];

  constructor(
    private readonly exercisesService: ExercisesService,
    modalService: ModalService,
    alertService: AlertService,
    setsService: SetsService
  ) {
    super(modalService, alertService, setsService);
  }

  get series(): number {
    return this.value.series;
  }

  get isSided(): boolean | undefined {
    return this.value.exercise?.sided;
  }

  get hasOneSerie(): boolean {
    return this.series < 2;
  }

  async ionViewDidEnter(): Promise<void> {
    this.exercises = await this.exercisesService.fetch();
  }

  resetTime(input: IonDatetime, predicate: boolean): void {
    if (predicate) {
      input.value = '00:00:00';
    }
  }
}
