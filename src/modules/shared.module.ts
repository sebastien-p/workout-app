import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CountdownComponent } from '../components/countdown/countdown.component';
import { DeletableComponent } from '../components/deletable/deletable.component';
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
import { WorkoutComponent } from '../components/workout/workout.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    CountdownComponent,
    DeletableComponent,
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
    WorkoutComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownComponent,
    DeletableComponent,
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
    WorkoutComponent
  ]
})
export class SharedModule {}
