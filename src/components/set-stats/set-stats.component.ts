import { Component, Input } from '@angular/core';

import { SetStats } from '../../models/set-stats.model';

@Component({
  selector: 'app-set-stats',
  templateUrl: 'set-stats.component.html'
})
export class SetStatsComponent {
  @Input()
  readonly thisTime: SetStats;

  @Input()
  readonly lastTime?: SetStats;
}
