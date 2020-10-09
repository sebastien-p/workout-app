import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { Insomnia } from '@ionic-native/insomnia/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Vibration } from '@ionic-native/vibration/ngx';

import { RootComponent } from '../../components/root/root.component';
import { environment } from '../../environments/environment';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RootRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    // Insomnia,
    // SplashScreen,
    // StatusBar,
    // Vibration,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  declarations: [RootComponent],
  bootstrap: [RootComponent]
})
export class RootModule {}
