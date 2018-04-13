import { Injectable } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { PageComponent } from './page.component';

@Injectable()
export abstract class ModalComponent extends PageComponent {
  constructor(
    protected readonly viewController: ViewController
  ) {
    super();
  }

  dismiss(): void {
    this.viewController.dismiss();
  }
}
