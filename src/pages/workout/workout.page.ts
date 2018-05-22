import { Component, Type } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemEditModalPage } from '../item-edit-modal.page';
import { SetsPage } from '../sets/sets.page';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.page.html'
})
export class WorkoutPage
extends ItemEditModalPage<DisplayWorkout, WorkoutsService> {
  readonly setsPage: Type<SetsPage> = SetsPage;

  constructor(
    navParams: NavParams,
    viewController: ViewController,
    workoutsService: WorkoutsService
  ) {
    super(
      navParams,
      viewController,
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
