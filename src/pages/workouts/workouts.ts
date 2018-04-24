import { Component } from '@angular/core';
import { AlertController, ModalController, Modal } from 'ionic-angular';

import { DisplayWorkout } from '../../models/workout.model';
import { PageComponent } from '../page.component';
import { WorkoutPage } from '../workout/workout';
import { WorkoutsService } from '../../services/workouts.service';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage extends PageComponent {
  workouts: Promise<DisplayWorkout[]>;

  constructor(
    private readonly alertController: AlertController,
    private readonly modalController: ModalController,
    private readonly workoutsService: WorkoutsService
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  private refresh(): void {
    this.workouts = this.workoutsService.fetch();
  }

  private reallyDelete(id:number): void {
    this.workoutsService.delete(id).then(() => this.refresh());
  }

  add(): void {
    this.edit(this.workoutsService.create());
  }

  edit(workout: DisplayWorkout): void {
    const modal: Modal = this.modalController.create(WorkoutPage, { workout });
    modal.onDidDismiss(() => this.refresh())
    modal.present();
  }

  remove({ id, name }: DisplayWorkout): void {
    this.alertController.create({
      title: `Delete "${name}"?`,
      buttons: [
        { text: 'Yes', handler: () => this.reallyDelete(id) },
        { text: 'No' }
      ]
    }).present();
  }
}
