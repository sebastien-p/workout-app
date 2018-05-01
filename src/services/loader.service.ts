import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoaderService {
  private readonly loader: Loading;
  private retain: number = 0;

  constructor(
    loadingController: LoadingController
  ) {
    this.loader = loadingController.create();
  }

  show(): void {
    if (this.retain) { return; }
    this.loader.present();
    this.retain += 1;
  }

  hide(): void {
    if (!this.retain) { return; }
    this.loader.dismiss();
    this.retain -= 1;
  }
}
