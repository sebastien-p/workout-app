import { Component } from '@angular/core';

import { FullRecord } from '../../models/record.model';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { RecordsService } from '../../services/records.service';
import { ListEditPage } from '../list-edit.page';
import { TrainingRecordPage } from '../training-record/training-record.page';

@Component({
  selector: 'app-training-records-page',
  templateUrl: 'training-records.page.html'
})
export class TrainingRecordsPage extends ListEditPage<
  FullRecord,
  RecordsService
> {
  constructor(
    alertService: AlertService,
    modalService: ModalService,
    recordsService: RecordsService
  ) {
    super(TrainingRecordPage, modalService, alertService, recordsService);
  }
}
