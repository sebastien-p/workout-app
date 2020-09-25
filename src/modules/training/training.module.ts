import { NgModule } from '@angular/core';

import { TrainingPage } from '../../pages/training/training.page';
import { TrainingRecordPage } from '../../pages/training-record/training-record.page';
import { TrainingRecordsPage } from '../../pages/training-records/training-records.page';
import { TrainingWorkoutPage } from '../../pages/training-workout/training-workout.page';
import { TrainingWorkoutsPage } from '../../pages/training-workouts/training-workouts.page';
import { SharedModule } from '../shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  imports: [SharedModule, TrainingRoutingModule],
  declarations: [
    TrainingPage,
    TrainingRecordPage,
    TrainingRecordsPage,
    TrainingWorkoutPage,
    TrainingWorkoutsPage
  ]
})
export class TrainingModule {}
