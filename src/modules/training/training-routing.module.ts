import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainingPage } from '../../pages/training/training.page';
import { TrainingRecordsPage } from '../../pages/training-records/training-records.page';
import { TrainingWorkoutsPage } from '../../pages/training-workouts/training-workouts.page';

const routes: Routes = [
  { path: 'workouts', component: TrainingWorkoutsPage },
  { path: 'records', component: TrainingRecordsPage },
  { path: '', component: TrainingPage }
  // TODO: redirect?
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
