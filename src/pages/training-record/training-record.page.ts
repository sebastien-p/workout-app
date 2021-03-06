import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

import { FullRecord } from '../../models/record.model';
import { FullSet } from '../../models/set.model';
import { AlertService } from '../../services/alert.service';
import { DateService } from '../../services/date.service';
import { ModalService } from '../../services/modal.service';
import { NumberService } from '../../services/number.service';
import { RecordsService } from '../../services/records.service';
import { SetsService } from '../../services/sets.service';
import { ItemEditModalPage } from '../item-edit-modal.page';

@Component({
  selector: 'app-training-record-page',
  templateUrl: 'training-record.page.html'
})
export class TrainingRecordPage extends ItemEditModalPage<
  FullRecord,
  RecordsService
> {
  sets?: FullSet[];

  @ViewChild(IonRange, { static: false })
  private readonly serieRange?: IonRange;

  constructor(
    private readonly setsService: SetsService,
    private readonly dateService: DateService,
    private readonly numberService: NumberService,
    modalService: ModalService,
    alertService: AlertService,
    recordsService: RecordsService
  ) {
    super(modalService, alertService, recordsService);
  }

  get set(): FullSet {
    return this.value.set;
  }

  async ionViewWillEnter(): Promise<void> {
    this.sets = await this.setsService.fetch();
  }

  onSetChange(): void {
    if (this.serieRange) {
      this.serieRange.value = 1;
    }
  }

  // FIXME: form validation + datetime picker
  protected save(): Promise<number> {
    const { date, value } = this.value;

    return super.save({
      ...this.value,
      date: this.dateService.getISODate(date),
      value: this.numberService.toUnsignedInt(value)
    });
  }
}
