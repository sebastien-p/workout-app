import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-deletable',
  templateUrl: './deletable.component.html'
})
export class DeletableComponent implements OnChanges {
  @Input()
  readonly disabled: boolean = false;

  @Output()
  readonly deleted: EventEmitter<void> = new EventEmitter();

  @ViewChild(IonItemSliding, { static: true })
  private readonly itemSliding: IonItemSliding;

  ngOnChanges({ disabled }: SimpleChanges): void {
    if (disabled?.currentValue) {
      this.itemSliding.close();
    }
  }
}
