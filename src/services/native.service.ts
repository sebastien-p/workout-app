import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Insomnia } from '@ionic-native/insomnia';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class NativeService {
  private readonly isCordova: Promise<boolean>;

  constructor(
    platform: Platform,
    private readonly dialogs: Dialogs,
    private readonly insomnia: Insomnia,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly vibration: Vibration
  ) {
    this.isCordova = platform.ready().then(runtime => runtime === 'cordova');
  }

  async initialize(): Promise<void> {
    if (!await this.isCordova) { return; }
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  async notify(): Promise<void> {
    if (!await this.isCordova) { return; }
    this.vibration.vibrate(200);
    this.dialogs.beep(1);
  }

  async keepAwake(): Promise<any> {
    if (await this.isCordova) { return this.insomnia.keepAwake(); }
  }

  async allowSleep(): Promise<any> {
    if (await this.isCordova) { return this.insomnia.allowSleepAgain(); }
  }
}
