import { NgModule, ModuleWithProviders } from '@angular/core';

import { DatabaseService } from './database.service';
import { ExercisesService } from './exercises.service';
import { WorkoutsService } from './workouts.service';
import { SetsService } from './sets.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        DatabaseService,
        ExercisesService,
        WorkoutsService,
        SetsService
      ]
    }
  }
}
