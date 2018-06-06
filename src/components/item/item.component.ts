import { Component, Input } from '@angular/core';

import { WithName } from '../../models/with-name.model';
import { WithDescription } from '../../models/with-description.model';

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
