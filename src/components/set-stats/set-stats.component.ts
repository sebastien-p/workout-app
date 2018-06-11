import { Component, Input } from '@angular/core';

import { Stats } from '../../models/stats.model';

@Component({
  selector: 'app-set-stats',
  templateUrl: 'set-stats.component.html'
})
export class SetStatsComponent {
  @Input()
  readonly thisTime: Stats;

  @Input()
  readonly lastTime?: Stats;
}
