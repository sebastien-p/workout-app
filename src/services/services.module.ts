import { NgModule, ModuleWithProviders } from '@angular/core';

import { DateService } from './date.service';
import { LoaderService } from './loader.service';
import { DatabaseService } from './database.service';
import { ExercisesService } from './exercises.service';
import { WorkoutsService } from './workouts.service';
import { SetsService } from './sets.service';
import { RecordsService } from './records.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        DateService,
        LoaderService,
        DatabaseService,
        ExercisesService,
        WorkoutsService,
        SetsService,
        RecordsService
      ]
    };
  }
}
