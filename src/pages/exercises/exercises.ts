import { Component } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';

import { DisplayExercise } from '../../models/exercise.model';
import { ExercisesService } from '../../services/exercises.service';
import { PageComponent } from '../page.component';
import { ExercisePage } from '../exercise/exercise';

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage extends PageComponent {
  exercises: Promise<DisplayExercise[]>;

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

  private reallyDelete(exercise: DisplayExercise): void {
    this.exercisesService.delete(exercise).then(() => this.refresh());
  }

  add(): void {
    this.edit(this.exercisesService.create());
  }

  edit(exercise: DisplayExercise): void {
    const modal: Modal = this.modalController.create(ExercisePage, {
      exercise
    });
    modal.onDidDismiss(() => this.refresh())
    modal.present();
  }

  remove(exercise: DisplayExercise): void {
    this.alertController.create({
      title: `Delete "${exercise.name}"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDelete(exercise) },
        { text: 'No' }
      ]
    }).present();
  }
}
