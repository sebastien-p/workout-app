import { Component, Input } from '@angular/core';

import { DisplaySet } from '../../models/set.model';

@Component({
  selector: 'app-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {
  @Input()
  set: DisplaySet;
}
