import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef
} from '@angular/core';

import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';

import { WithId } from '../../models/with-id.model';
import { BaseComponent } from '../base.component';

type Context<T> = {
  $implicit: T;
  [key: string]: any;
};

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
  readonly onView: EventEmitter<T> = new EventEmitter();

  @Output()
  readonly onRemove: EventEmitter<T> = new EventEmitter();

  @Output()
  readonly onReorder: EventEmitter<ReorderIndexes> = new EventEmitter();

  @ContentChild(TemplateRef)
  readonly template: TemplateRef<Context<T>>;

  getContext(item: T): Context<T> {
    return { $implicit: item };
  }
}
