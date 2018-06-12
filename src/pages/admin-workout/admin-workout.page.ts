import { Component, Type } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { FullWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemEditModalPage } from '../item-edit-modal.page';
import { AdminSetsPage } from '../admin-sets/admin-sets.page';

@Component({
  selector: 'page-admin-workout',
  templateUrl: 'admin-workout.page.html'
})
export class AdminWorkoutPage
extends ItemEditModalPage<FullWorkout, WorkoutsService> {
  readonly setsPage: Type<AdminSetsPage> = AdminSetsPage;

  constructor(
    navParams: NavParams,
    viewController: ViewController,
    alertController: AlertController,
    workoutsService: WorkoutsService
  ) {
    super(
      navParams,
      viewController,
      alertController,
      workoutsService
    );
  }

  submit(): void {
    if (!this.isNew) { return super.submit(); }
    if (!this.canSubmit) { return; }
    this.save().then(id => {
      this.item.id = id;
      this.reset();
    });
  }
}