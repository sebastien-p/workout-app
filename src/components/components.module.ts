import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { IdentifiableComponent } from './identifiable/identifiable.component';
import { NameableComponent } from './nameable/nameable.component';
import { PauseableComponent } from './pauseable/pauseable.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutComponent } from './workout/workout.component';
import { SetComponent } from './set/set.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    IonicModule,
    IdentifiableComponent,
    NameableComponent,
    PauseableComponent,
    ListComponent,
    ItemComponent,
    ExerciseComponent,
    WorkoutComponent,
    SetComponent,
    PlayerComponent
  ],
  declarations: [
    IdentifiableComponent,
    NameableComponent,
    PauseableComponent,
    ListComponent,
    ItemComponent,
    ExerciseComponent,
    WorkoutComponent,
    SetComponent,
    PlayerComponent
  ]
})
export class ComponentsModule {}
