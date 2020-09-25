import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef
} from '@angular/core';

import { ItemReorderEventDetail } from '@ionic/core';

import { WithId } from '../../models/with-id.model';
import { BaseComponent } from '../component';

export interface Context<T> {
  $implicit: T;
}

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html'
})
export class ListComponent<T extends WithId = WithId> extends BaseComponent {
  @Input()
  readonly list: T[];

  @Input()
  readonly delete: boolean = false;

  @Input()
  readonly reorder: boolean = false;

  @Output()
  readonly viewed: EventEmitter<T> = new EventEmitter();

  @Output()
  readonly removed: EventEmitter<T> = new EventEmitter();

  @Output()
  readonly reordered: EventEmitter<ItemReorderEventDetail> = new EventEmitter();

  @ContentChild(TemplateRef)
  readonly template: TemplateRef<Context<T>>;

  getContext($implicit: T): Context<T> {
    return { $implicit };
  }
}
