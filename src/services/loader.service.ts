import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoaderService {
  private retain: number = 0;
  private loader: Loading;

  constructor(
    private readonly loadingController: LoadingController
  ) {}

  show(): void {
    if (this.retain) { return; }
    this.loader = this.loadingController.create();
    this.loader.present();
    this.retain += 1;
  }

  hide(): void {
    if (!this.retain) { return; }
    this.loader.dismiss();
    this.loader = null;
    this.retain -= 1;
  }
}
