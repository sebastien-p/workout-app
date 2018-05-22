import { Component, Input } from '@angular/core';

import { Pauseable } from '../../models/pauseable.model';

@Component({
  selector: 'app-pauseable',
  templateUrl: 'pauseable.component.html'
})
export class PauseableComponent {
  @Input()
  readonly pauseable: Pauseable;
}
