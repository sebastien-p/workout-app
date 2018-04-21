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
    this.refreshList();
  }

  private refreshList(): void {
    this.exercises = this.exercisesService.fetch();
  }

  private reallyDeleteExercise(id: number): void {
    this.exercisesService.delete(id).then(() => this.refreshList());
  }

  addExercise(): void {
    this.editExercise(this.exercisesService.create());
  }

  editExercise(exercise: Exercise): void {
    const modal: Modal = this.modalController.create(ExercisePage, { exercise });
    modal.onDidDismiss(() => this.refreshList())
    modal.present();
  }

  removeExercise({ id, name }: Exercise): void {
    this.alertController.create({
      title: `Delete "${name}"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDeleteExercise(id) },
        { text: 'No' }
      ]
    }).present();
  }
}
