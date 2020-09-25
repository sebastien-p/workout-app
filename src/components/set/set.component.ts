import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Amplitude } from '../../models/amplitude.enum';
import { Rythm } from '../../models/rythm.enum';
import { FullSet } from '../../models/set.model';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-set',
  templateUrl: 'set.component.html'
})
export class SetComponent implements OnChanges {
  modifiers: string;

  @Input()
  readonly set: FullSet;

  @Input()
  readonly compact: boolean = false;

  constructor(private readonly stringService: StringService) {}

  ngOnChanges({ set }: SimpleChanges): void {
    if (set) {
      this.setModifiers();
    }
  }

  private setModifiers(): void {
    const { amplitude, rythm } = this.set;
    this.modifiers = this.stringService.formatTuple(
      Amplitude[amplitude],
      Rythm[rythm]
    );
  }
}
