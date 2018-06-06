import { Component, Input } from '@angular/core';

import { DisplaySet } from '../../models/set.model';
import { Amplitude } from '../../models/amplitude.enum';
import { Rythm } from '../../models/rythm.enum';

@Component({
  selector: 'app-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {
  @Input()
  readonly set: DisplaySet;

  @Input()
  readonly compact: boolean = false;

  get amplitude() {
    return Amplitude[this.set.amplitude];
  }

  get rythm() {
    return Rythm[this.set.rythm];
  }
}
