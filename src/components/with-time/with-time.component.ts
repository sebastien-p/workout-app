import { Component, Input, OnChanges } from '@angular/core';

import { WithTime } from '../../models/with-time.model';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-with-time',
  templateUrl: 'with-time.component.html'
})
export class WithTimeComponent implements OnChanges {
  time: string;

  @Input()
  readonly item: WithTime;

  constructor(private readonly stringService: StringService) {}

  ngOnChanges(): void {
    this.setTime();
  }

  private setTime(): void {
    const { time, timeAfter } = this.item;
    this.time = this.stringService.formatTuple(time, timeAfter);
  }
}
