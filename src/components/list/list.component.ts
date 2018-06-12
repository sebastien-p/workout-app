import {
  Component,
  AfterViewChecked,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { ViewController, VirtualScroll } from 'ionic-angular';
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
export class ListComponent<T extends WithId = WithId> extends BaseComponent
implements AfterViewChecked {
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

  @ViewChild(VirtualScroll)
  private readonly virtualScroll: VirtualScroll;

  constructor(
    private readonly viewController: ViewController
  ) {
    super();
  }

  ngAfterViewChecked() {
    this.refreshVirtualScroll();
  }

  getContext(item: T): Context<T> {
    return { $implicit: item };
  }

  private refreshVirtualScroll() { // FIXME
    // https://github.com/ionic-team/ionic/issues/9655#issuecomment-364324438
    if (!this.virtualScroll || this.virtualScroll._init) { return; }
    this.viewController.readReady.emit();
    this.viewController.writeReady.emit();
  }
}
