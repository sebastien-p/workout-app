import { Component, Type } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home.page';
import { AdminPage } from '../pages/admin/admin.page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage: Type<HomePage> = HomePage;
  adminPage: Type<AdminPage> = AdminPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

