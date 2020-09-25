import { Component, Input } from '@angular/core';

import { WithDescription } from '../../models/with-description.model';
import { WithName } from '../../models/with-name.model';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html'
})
export class ItemComponent {
  @Input()
  readonly name: WithName;

  @Input()
  readonly description: WithDescription;
}
