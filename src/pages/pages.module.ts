import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { HomePage } from './home/home';
import { AdminPage } from './admin/admin';
import { ExercisePage } from './exercise/exercise';
import { ExercisesPage } from './exercises/exercises';
import { WorkoutPage } from './workout/workout';
import { WorkoutsPage } from './workouts/workouts';
import { SetPage } from './set/set';
import { SetsPage } from './sets/sets';

@NgModule({
  imports: [
    FormsModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    IonicModule
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
  ],
  providers: []
})
export class PagesModule {}
