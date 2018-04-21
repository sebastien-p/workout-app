import { Component } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';

import { PageComponent } from '../page.component';
import { ExercisePage } from '../exercise/exercise';
import { Exercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage extends PageComponent {
  exercises: Promise<Exercise[]>;

  constructor(
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly exercisesService: ExercisesService
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  private refresh(): void {
    this.exercises = this.exercisesService.fetch();
  }

  private reallyDelete(id: number): void {
    this.exercisesService.delete(id).then(() => this.refresh());
  }

  add(): void {
    this.edit(this.exercisesService.create());
  }

  edit(exercise: Exercise): void {
    const modal: Modal = this.modalController.create(ExercisePage, { exercise });
    modal.onDidDismiss(() => this.refresh())
    modal.present();
  }

  remove({ id, name }: Exercise): void {
    this.alertController.create({
      title: `Delete "${name}"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDelete(id) },
        { text: 'No' }
      ]
    }).present();
  }
}
