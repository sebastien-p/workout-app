import { Component, Input } from '@angular/core';

import { FullRecord } from '../../models/record.model';

@Component({
  selector: 'app-record',
  templateUrl: 'record.component.html'
})
export class RecordComponent {
  @Input()
  readonly record: FullRecord;
}
