import { Component } from '@angular/core';
import { NavComponent } from '@ionic/core';

import { FullWorkout } from '../../models/workout.model';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemEditModalPage } from '../item-edit-modal.page';
import { AdminSetsPage } from '../admin-sets/admin-sets.page';

@Component({
  selector: 'app-admin-workout-page',
  templateUrl: 'admin-workout.page.html'
})
export class AdminWorkoutPage extends ItemEditModalPage<
  FullWorkout,
  WorkoutsService
> {
  readonly setsPage: NavComponent = AdminSetsPage;

  constructor(
    modalService: ModalService,
    alertService: AlertService,
    workoutsService: WorkoutsService
  ) {
    super(modalService, alertService, workoutsService);
  }

  async submit(): Promise<void> {
    if (!this.isNew) {
      return super.submit();
    }

    if (this.canSubmit) {
      this.item.id = await this.save();
      this.reset();
    }
  }
}
