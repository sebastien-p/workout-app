import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CountdownComponent } from '../components/countdown/countdown.component';
import { EmptyComponent } from '../components/empty/empty.component';
import { ExerciseComponent } from '../components/exercise/exercise.component';
import { FileInputComponent } from '../components/file-input/file-input.component';
import { ImageComponent } from '../components/image/image.component';
import { ItemComponent } from '../components/item/item.component';
import { ListComponent } from '../components/list/list.component';
import { NavComponent } from '../components/nav/nav.component';
import { RecordComponent } from '../components/record/record.component';
import { SetComponent } from '../components/set/set.component';
import { SetStatsComponent } from '../components/set-stats/set-stats.component';
import { StatsComponent } from '../components/stats/stats.component';
import { WithDescriptionComponent } from '../components/with-description/with-description.component';
import { WithNameComponent } from '../components/with-name/with-name.component';
import { WithRestComponent } from '../components/with-rest/with-rest.component';
import { WorkoutComponent } from '../components/workout/workout.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    CountdownComponent,
    EmptyComponent,
    ExerciseComponent,
    FileInputComponent,
    ImageComponent,
    ItemComponent,
    ListComponent,
    NavComponent,
    RecordComponent,
    SetComponent,
    SetStatsComponent,
    StatsComponent,
    WithDescriptionComponent,
    WithNameComponent,
    WithRestComponent,
    WorkoutComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownComponent,
    EmptyComponent,
    ExerciseComponent,
    FileInputComponent,
    ImageComponent,
    ItemComponent,
    ListComponent,
    NavComponent,
    RecordComponent,
    SetComponent,
    SetStatsComponent,
    StatsComponent,
    WithDescriptionComponent,
    WithNameComponent,
    WithRestComponent,
    WorkoutComponent
  ]
})
export class SharedModule {}
