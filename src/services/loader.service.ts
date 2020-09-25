import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { NumberService } from './number.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: Promise<HTMLIonLoadingElement>;
  private users = 0;

  constructor(
    loadingController: LoadingController,
    private readonly numberService: NumberService
  ) {
    this.loader = loadingController.create();
  }

  async show(): Promise<void> {
    if (!this.users) {
      this.useLoader('present');
    }

    this.addUsers(1);
  }

  async hide(): Promise<void> {
    this.addUsers(-1);

    if (!this.users) {
      this.useLoader('dismiss');
    }
  }

  private addUsers(increment: number): void {
    this.users = this.numberService.clamp(this.users + increment);
  }

  private async useLoader(method: 'present' | 'dismiss'): Promise<void> {
    const loader: HTMLIonLoadingElement = await this.loader;
    await loader[method]();
  }
}
