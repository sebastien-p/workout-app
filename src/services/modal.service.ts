import { Injectable } from '@angular/core';
import { NavComponent as ComponentType, ComponentProps } from '@ionic/core';
import { ModalController } from '@ionic/angular';

import { NavComponent } from '../components/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(protected readonly modalController: ModalController) {}

  async modal(
    component: ComponentType,
    componentProps?: ComponentProps
  ): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalController.create({
      componentProps: { component, componentProps },
      // Because we can't use IonNav directly...
      component: NavComponent,
      backdropDismiss: false
    });

    await modal.present();
    await modal.onDidDismiss();
  }

  dismiss(): Promise<boolean> {
    return this.modalController.dismiss();
  }
}
