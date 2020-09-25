import { Component, Input } from '@angular/core';

import { WithRest } from '../../models/with-rest.model';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-with-rest',
  templateUrl: 'with-rest.component.html'
})
export class WithRestComponent {
  @Input()
  readonly item: WithRest;

  constructor(
    private readonly stringService: StringService
  ) {}

  get rest(): string {
    const { rest, restAfter } = this.item;
    return this.stringService.formatTuple(rest, restAfter);
  }
}
