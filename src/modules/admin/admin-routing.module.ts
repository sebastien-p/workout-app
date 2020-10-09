import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPage } from '../../pages/admin/admin.page';
import { AdminWorkoutsPage } from '../../pages/admin-workouts/admin-workouts.page';
import { AdminExercisesPage } from '../../pages/admin-exercises/admin-exercises.page';

const routes: Routes = [
  { path: 'exercises', component: AdminExercisesPage },
  { path: 'workouts', component: AdminWorkoutsPage },
  { path: '', component: AdminPage },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
