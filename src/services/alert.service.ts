import { Injectable } from '@angular/core';
import { AlertInput } from '@ionic/core';
import { AlertController } from '@ionic/angular';

export interface AlertData<T> {
  values: { value: T | undefined };
  resolved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(protected readonly alertController: AlertController) {}

  async confirm(question: string = 'Are you sure?'): Promise<boolean> {
    const { resolved } = await this.alert<void>(question, 'Yes', 'No');
    return resolved;
  }

  async prompt(
    title: string,
    input: Omit<AlertInput, 'name'>
  ): Promise<string | null> {
    const {
      resolved,
      values: { value }
    } = await this.alert<string>(title, 'Save', 'Cancel', input);

    return (resolved && value && value.trim()) || null;
  }

  async alert<V>(
    header: string,
    resolveButton: string,
    rejectButton: string,
    input?: Omit<AlertInput, 'name'>
  ): Promise<AlertData<V>> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      buttons: [
        { text: rejectButton, handler: () => ({ resolved: false }) },
        { text: resolveButton, handler: () => ({ resolved: true }) }
      ],
      inputs: input ? [{ ...input, name: 'value' }] : [],
      backdropDismiss: false,
      header
    });

    await alert.present();

    const { data } = await alert.onDidDismiss<AlertData<V>>();
    return data;
  }
}
