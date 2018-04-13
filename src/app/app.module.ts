import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ServicesModule.forRoot(),
    PagesModule
  ],
  declarations: [
    MyApp
  ],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [
    IonicApp
  ]
})
export class AppModule {}
