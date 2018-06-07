import { Component, Input } from '@angular/core';

import { WithRest } from '../../models/with-rest.model';

@Component({
  selector: 'app-with-rest',
  templateUrl: 'with-rest.component.html'
})
export class WithRestComponent {
  @Input()
  readonly item: WithRest;
}
