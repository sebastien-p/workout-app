import { ViewController } from 'ionic-angular';

import { PageComponent } from './page.component';

export abstract class ModalComponent extends PageComponent {
  constructor(
    protected readonly viewController: ViewController
  ) {
    super();
  }

  dismiss(...parameters: any[]): Promise<any> {
    return this.viewController.dismiss(...parameters);
  }
}
