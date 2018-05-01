import { Component, Type } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DisplayWorkout } from '../../models/workout.model';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemModalComponent } from '../item-modal.component';
import { SetsPage } from '../sets/sets';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage
extends ItemModalComponent<DisplayWorkout, WorkoutsService> {
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
