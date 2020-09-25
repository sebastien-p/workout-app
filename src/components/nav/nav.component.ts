import { Component, Input } from '@angular/core';
import { NavComponent as ComponentType, ComponentProps } from '@ionic/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html'
})
export class NavComponent {
  @Input()
  readonly component: ComponentType;

  @Input()
  readonly componentProps: ComponentProps;
}
