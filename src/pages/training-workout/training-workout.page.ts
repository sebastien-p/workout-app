import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { FullExercise } from '../../models/exercise.model';
import { FullRecord } from '../../models/record.model';
import { FullSet } from '../../models/set.model';
import { Stats } from '../../models/stats.model';
import { FullWorkout } from '../../models/workout.model';
import { CountdownComponent } from '../../components/countdown/countdown.component';
import { AlertService } from '../../services/alert.service';
import { DateService } from '../../services/date.service';
import { ModalService } from '../../services/modal.service';
import { NativeService } from '../../services/native.service';
import { NumberService } from '../../services/number.service';
import { RecordsService } from '../../services/records.service';
import { WorkoutsService } from '../../services/workouts.service';
import { ItemModalPage } from '../item-modal.page';

@Component({
  selector: 'app-training-workout-page',
  templateUrl: 'training-workout.page.html'
})
export class TrainingWorkoutPage
  extends ItemModalPage<FullWorkout, WorkoutsService>
  implements OnInit, OnDestroy {
  setNumber = 1;
  serieNumber = 1;

  private readonly startDate: string;
  private stats?: ([Stats, Promise<Stats>] | undefined)[];

  @ViewChild(CountdownComponent, { static: false })
  private readonly countdown?: CountdownComponent;

  constructor(
    private readonly recordsService: RecordsService,
    private readonly nativeService: NativeService,
    private readonly numberService: NumberService,
    workoutsService: WorkoutsService,
    alertService: AlertService,
    modalService: ModalService,
    dateService: DateService
  ) {
    super(modalService, alertService, workoutsService);
    this.startDate = dateService.getISODate();
  }

  get previousSet(): FullSet | undefined {
    return this.sets[this.setNumber - 2];
  }

  get currentSet(): FullSet | undefined {
    return this.sets[this.setNumber - 1];
  }

  get nextSet(): FullSet | undefined {
    return this.sets[this.setNumber];
  }

  get hasSet(): boolean {
    return !!this.currentSet;
  }

  get isFirstSet(): boolean {
    return !this.previousSet;
  }

  get isLastSet(): boolean {
    return !this.nextSet;
  }

  get isFirstSerie(): boolean {
    return !this.hasSet || this.serieNumber === 1;
  }

  get isLastSerie(): boolean | null {
    const { serieNumber, seriesTotal } = this;

    if (serieNumber === seriesTotal) {
      return true;
    }

    const series: number = this.getSeriesTotal(this.currentSet, false);
    return series < seriesTotal && serieNumber === series && null;
  }

  get isStart(): boolean {
    return this.isFirstSet && this.isFirstSerie;
  }

  get isEnd(): boolean | null {
    return this.isLastSet && this.isLastSerie;
  }

  get shouldRecord(): boolean {
    return this.item.record && this.hasSet;
  }

  get setsTotal(): number {
    return this.sets.length;
  }

  get seriesTotal(): number {
    return this.getSeriesTotal(this.currentSet);
  }

  get exercise(): FullExercise | undefined {
    return this.currentSet?.exercise;
  }

  get time(): string | undefined {
    const { currentSet: set, isLastSerie: last } = this;

    if (set) {
      return set[last ? 'timeAfter' : last === null ? 'timeSided' : 'time'];
    }
  }

  get thisTimeStats(): Stats | undefined {
    return this.stats?.[this.setNumber - 1]?.[0];
  }

  get lastTimeStats(): Promise<Stats> | undefined {
    return this.stats?.[this.setNumber - 1]?.[1];
  }

  private get sets(): FullSet[] {
    return this.item.sets;
  }

  ngOnInit(): void {
    this.nativeService.keepAwake();

    if (this.shouldRecord) {
      this.stats = this.sets.map(set => {
        return this.recordsService.getStats(set, this.startDate);
      });
    }
  }

  ngOnDestroy(): void {
    this.nativeService.allowSleep();
  }

  dismiss(): Promise<boolean> {
    return super.dismiss(this.isEnd);
  }

  showPrevious(): void {
    this.show(-1, this.getSeriesTotal(this.previousSet), this.isFirstSerie);
  }

  showNext(): void {
    if (this.isEnd) {
      this.dismiss();
    } else {
      this.show(+1, 1, this.isLastSerie);
    }
  }

  async promptRepetitions(): Promise<void> {
    const { thisTimeStats, serieNumber } = this;

    this.nativeService.notify();

    if (
      !this.shouldRecord ||
      !thisTimeStats ||
      serieNumber > thisTimeStats.records.length
    ) {
      return;
    }

    const repetitions: string | null = await this.alertService.prompt(
      'How many repetitions?',
      {
        // FIXME: input validation
        attributes: { autoFocus: true, step: 1 },
        placeholder: '0',
        type: 'number',
        min: 0
      }
    );

    if (repetitions) {
      await this.recordValue(
        thisTimeStats,
        serieNumber,
        // FIXME: input validation
        this.numberService.toUnsignedInt(repetitions)
      );
    }
  }

  private getSeriesTotal(
    set: FullSet | undefined,
    sided: boolean = true
  ): number {
    if (!set) {
      return 1;
    }

    const { series, exercise } = set;
    return sided && exercise.sided ? series * 2 : series;
  }

  private show(
    shift: number,
    serieNumber: number,
    shouldChangeSet: boolean | null
  ): void {
    this.countdown?.stop();

    if (shouldChangeSet) {
      this.setNumber = this.setNumber + shift;
      this.serieNumber = serieNumber;
    } else {
      this.serieNumber += shift;
    }
  }

  // TODO: do nothing if value is 0?
  private async recordValue(
    stats: Stats,
    serie: number,
    value: number
  ): Promise<void> {
    const record: FullRecord = this.recordsService.setSerieValue(
      stats,
      serie,
      value
    );

    record.id = await this.recordsService.save(record);
  }
}
