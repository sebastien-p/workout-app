import { NgModule } from '@angular/core';

import { AdminPage } from '../../pages/admin/admin.page';
import { AdminSetPage } from '../../pages/admin-set/admin-set.page';
import { AdminSetsPage } from '../../pages/admin-sets/admin-sets.page';
import { AdminWorkoutPage } from '../../pages/admin-workout/admin-workout.page';
import { AdminWorkoutsPage } from '../../pages/admin-workouts/admin-workouts.page';
import { AdminExercisePage } from '../../pages/admin-exercise/admin-exercise.page';
import { AdminExercisesPage } from '../../pages/admin-exercises/admin-exercises.page';
import { SharedModule } from '../shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminPage,
    AdminExercisePage,
    AdminExercisesPage,
    AdminSetPage,
    AdminSetsPage,
    AdminWorkoutPage,
    AdminWorkoutsPage
  ]
})
export class AdminModule {}
