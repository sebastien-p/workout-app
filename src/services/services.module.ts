import { NgModule, ModuleWithProviders } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { Insomnia } from '@ionic-native/insomnia';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Vibration } from '@ionic-native/vibration';

import { DateService } from './date.service';
import { NumberService } from './number.service';
import { LoaderService } from './loader.service';
import { DatabaseService } from './database.service';
import { ExercisesService } from './exercises.service';
import { WorkoutsService } from './workouts.service';
import { SetsService } from './sets.service';
import { RecordsService } from './records.service';
import { NativeService } from './native.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        Dialogs,
        Insomnia,
        SplashScreen,
        StatusBar,
        Vibration,
        DateService,
        NumberService,
        LoaderService,
        DatabaseService,
        ExercisesService,
        WorkoutsService,
        SetsService,
        RecordsService,
        NativeService
      ]
    };
  }
}
