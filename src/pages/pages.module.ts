import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home/home.page';
import { AdminPage } from './admin/admin.page';
import { ExercisePage } from './exercise/exercise.page';
import { ExercisesPage } from './exercises/exercises.page';
import { WorkoutPage } from './workout/workout.page';
import { WorkoutsPage } from './workouts/workouts.page';
import { SetPage } from './set/set.page';
import { SetsPage } from './sets/sets.page';

@NgModule({
  imports: [
    ComponentsModule
  ],
  declarations: [
    HomePage,
    AdminPage,
    ExercisePage,
    ExercisesPage,
    WorkoutPage,
    WorkoutsPage,
    SetPage,
    SetsPage
  ],
  entryComponents: [
    HomePage,
    AdminPage,
    ExercisePage,
    ExercisesPage,
    WorkoutPage,
    WorkoutsPage,
    SetPage,
    SetsPage
  ]
})
export class PagesModule {}
