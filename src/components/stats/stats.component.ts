import { Component, Input } from '@angular/core';

import { Stats } from '../../models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html'
})
export class StatsComponent {
  @Input()
  readonly stats?: Stats;
}
