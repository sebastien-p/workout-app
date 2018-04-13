import { Component, Type } from '@angular/core';

import { PageComponent } from '../page.component';
import { ExercisesPage } from '../exercises/exercises';
import { WorkoutsPage } from '../workouts/workouts';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage extends PageComponent {
  readonly exercisesPage: Type<ExercisesPage> = ExercisesPage;
  readonly workoutsPage: Type<WorkoutsPage> = WorkoutsPage;
}
