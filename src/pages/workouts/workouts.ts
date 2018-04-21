import { Component } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';

import { PageComponent } from '../page.component';
import { WorkoutPage } from '../workout/workout';
import { Workout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage extends PageComponent {
  workouts: Promise<Workout[]>;

  constructor(
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly workoutsService: WorkoutsService
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this.refreshList();
  }

  private refreshList(): void {
    this.workouts = this.workoutsService.fetch();
  }

  private reallyDeleteWorkout(id:number): void {
    this.workoutsService.delete(id).then(() => this.refreshList());
  }

  addWorkout(): void {
    this.editWorkout(this.workoutsService.create());
  }

  editWorkout(workout: Workout): void {
    const modal: Modal = this.modalController.create(WorkoutPage, { workout });
    modal.onDidDismiss(() => this.refreshList())
    modal.present();
  }

  removeWorkout({ id, name }: Workout): void {
    this.alertController.create({
      title: `Delete "${name}"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDeleteWorkout(id) },
        { text: 'No' }
      ]
    }).present();
  }
}
