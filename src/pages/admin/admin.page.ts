import { Component, Type } from '@angular/core';

import { ExercisesPage } from '../exercises/exercises.page';
import { WorkoutsPage } from '../workouts/workouts.page';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.page.html'
})
export class AdminPage {
  readonly exercisesPage: Type<ExercisesPage> = ExercisesPage;
  readonly workoutsPage: Type<WorkoutsPage> = WorkoutsPage;
}
