import { Component, Input } from '@angular/core';

import { WithName } from '../../models/with-name.model';

@Component({
  selector: 'app-with-name',
  templateUrl: 'with-name.component.html'
})
export class WithNameComponent {
  @Input()
  readonly item: WithName;
}
