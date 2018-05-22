import { Component, Input } from '@angular/core';

import { Identifiable } from '../../models/identifiable.model';

@Component({
  selector: 'app-identifiable',
  templateUrl: 'identifiable.component.html'
})
export class IdentifiableComponent {
  @Input()
  readonly identifiable: Identifiable;
}
