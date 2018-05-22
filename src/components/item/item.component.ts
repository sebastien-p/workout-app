import { Component, Input } from '@angular/core';

import { Identifiable } from '../../models/identifiable.model';
import { Nameable } from '../../models/nameable.model';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html'
})
export class ItemComponent {
  @Input()
  readonly identifiable: Identifiable;

  @Input()
  readonly nameable: Nameable;
}
