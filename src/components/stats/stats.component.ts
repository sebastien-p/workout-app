import { Component, Input } from '@angular/core';

import { Stats } from '../../models/stats.model';
import { BaseComponent } from '../component';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html'
})
export class StatsComponent extends BaseComponent {
  @Input()
  readonly stats?: Stats;
}
