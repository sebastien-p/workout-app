import { Component, Input } from '@angular/core';

import { SetStats } from '../../models/set-stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html'
})
export class StatsComponent {
  @Input()
  readonly stats?: SetStats;
}
