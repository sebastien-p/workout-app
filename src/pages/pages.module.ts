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
    SetPage
  ],
  entryComponents: [
    HomePage,
    AdminPage,
    ExercisePage,
    ExercisesPage,
    WorkoutPage,
    WorkoutsPage,
    SetPage
  ],
  providers: []
})
export class PagesModule {}
