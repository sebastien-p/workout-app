import { Component, Input } from '@angular/core';

import { Mode } from '../../models/mode.enum';
import { FullSet } from '../../models/set.model';

@Component({
  selector: 'app-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {
  @Input()
  readonly set: FullSet;

  @Input()
  readonly compact: boolean = false;

  get mode(): string {
    return Mode[this.set.mode];
  }
}
