import { Component, Input } from '@angular/core';

import { WithDescription } from '../../models/with-description.model';

@Component({
  selector: 'app-with-description',
  templateUrl: 'with-description.component.html'
})
export class WithDescriptionComponent {
  @Input()
  readonly item: WithDescription;
}
