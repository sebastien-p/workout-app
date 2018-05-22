import { Component, Type } from '@angular/core';

import { AdminExercisesPage } from '../admin-exercises/admin-exercises.page';
import { AdminWorkoutsPage } from '../admin-workouts/admin-workouts.page';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.page.html'
})
export class AdminPage {
  readonly exercisesPage: Type<AdminExercisesPage> = AdminExercisesPage;
  readonly workoutsPage: Type<AdminWorkoutsPage> = AdminWorkoutsPage;
}
