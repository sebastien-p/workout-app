import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { AdminPage } from './admin/admin.page';
import { AdminExercisePage } from './admin-exercise/admin-exercise.page';
import { AdminExercisesPage } from './admin-exercises/admin-exercises.page';
import { AdminSetPage } from './admin-set/admin-set.page';
import { AdminSetsPage } from './admin-sets/admin-sets.page';
import { AdminWorkoutPage } from './admin-workout/admin-workout.page';
import { AdminWorkoutsPage } from './admin-workouts/admin-workouts.page';
import { ExploitPage } from './exploit/exploit.page';
import { ExploitHistoryPage } from './exploit-history/exploit-history.page';
import { ExploitWorkoutPage } from './exploit-workout/exploit-workout.page';
import { ExploitWorkoutsPage } from './exploit-workouts/exploit-workouts.page';

@NgModule({
  imports: [
    ComponentsModule
  ],
  declarations: [
    AdminPage,
    AdminExercisePage,
    AdminExercisesPage,
    AdminSetPage,
    AdminSetsPage,
    AdminWorkoutPage,
    AdminWorkoutsPage,
    ExploitPage,
    ExploitHistoryPage,
    ExploitWorkoutPage,
    ExploitWorkoutsPage
  ],
  entryComponents: [
    AdminPage,
    AdminExercisePage,
    AdminExercisesPage,
    AdminSetPage,
    AdminSetsPage,
    AdminWorkoutPage,
    AdminWorkoutsPage,
    ExploitPage,
    ExploitHistoryPage,
    ExploitWorkoutPage,
    ExploitWorkoutsPage
  ]
})
export class PagesModule {}
