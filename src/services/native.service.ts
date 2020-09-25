import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativeService {
  private readonly isHybrid: Promise<boolean>;

  constructor(
    platform: Platform,
    private readonly dialogs: Dialogs,
    private readonly insomnia: Insomnia,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly vibration: Vibration
  ) {
    this.isHybrid = platform.ready().then(runtime => runtime === 'hybrid');
  }

  async initialize(): Promise<void> {
    if (await this.isHybrid) {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }

  async notify(): Promise<void> {
    if (await this.isHybrid) {
      this.vibration.vibrate(200);
      this.dialogs.beep(1);
    }
  }

  async keepAwake(): Promise<void> {
    if (await this.isHybrid) {
      await this.insomnia.keepAwake();
    }
  }

  async allowSleep(): Promise<void> {
    if (await this.isHybrid) {
      await this.insomnia.allowSleepAgain();
    }
  }
}
