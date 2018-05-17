import { Component, Input } from '@angular/core';

import { Nameable } from '../../models/nameable.model';

@Component({
  selector: 'app-nameable',
  templateUrl: 'nameable.component.html'
})
export class NameableComponent {
  @Input()
  nameable: Nameable;
}
