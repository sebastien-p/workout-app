import { Component, Input, OnChanges } from '@angular/core';

import { WithRest } from '../../models/with-rest.model';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-with-rest',
  templateUrl: 'with-rest.component.html'
})
export class WithRestComponent implements OnChanges {
  rest: string;

  @Input()
  readonly item: WithRest;

  constructor(private readonly stringService: StringService) {}

  ngOnChanges(): void {
    this.setRest();
  }

  private setRest(): void {
    const { rest, restAfter } = this.item;
    this.rest = this.stringService.formatTuple(rest, restAfter);
  }
}
