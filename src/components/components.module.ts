import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { WithNameComponent } from './with-name/with-name.component';

import {
  WithDescriptionComponent
} from './with-description/with-description.component'

import { WithRestComponent } from './with-rest/with-rest.component';
import { EmptyComponent } from './empty/empty.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutComponent } from './workout/workout.component';
import { SetComponent } from './set/set.component';
import { RecordComponent } from './record/record.component';
import { StatsComponent } from './stats/stats.component';
import { SetStatsComponent } from './set-stats/set-stats.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    IonicModule,
    WithNameComponent,
    WithDescriptionComponent,
    WithRestComponent,
    EmptyComponent,
    ListComponent,
    ItemComponent,
    CountdownComponent,
    ExerciseComponent,
    WorkoutComponent,
    SetComponent,
    RecordComponent,
    StatsComponent,
    SetStatsComponent
  ],
  declarations: [
    WithNameComponent,
    WithDescriptionComponent,
    WithRestComponent,
    EmptyComponent,
    ListComponent,
    ItemComponent,
    CountdownComponent,
    ExerciseComponent,
    WorkoutComponent,
    SetComponent,
    RecordComponent,
    StatsComponent,
    SetStatsComponent
  ]
})
export class ComponentsModule {}
