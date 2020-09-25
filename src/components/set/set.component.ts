import { Component, Input } from '@angular/core';

import { FullSet } from '../../models/set.model';
import { Amplitude } from '../../models/amplitude.enum';
import { Rythm } from '../../models/rythm.enum';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-set',
  templateUrl: 'set.component.html'
})
export class SetComponent {
  @Input()
  readonly set: FullSet;

  @Input()
  readonly compact: boolean = false;

  constructor(
    private readonly stringService: StringService
  ) {}

  get modifiers(): string {
    const { amplitude, rythm } = this.set;
    return this.stringService.formatTuple(Amplitude[amplitude], Rythm[rythm]);
  }
}
