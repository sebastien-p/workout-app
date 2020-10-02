import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { FullExercise } from '../../models/exercise.model';
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
  private stats?: [Stats, Promise<Stats>][];

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

  get isLastSerie(): boolean {
    return this.serieNumber === this.seriesTotal;
  }

  get isStart(): boolean {
    return this.isFirstSet && this.isFirstSerie;
  }

  get isEnd(): boolean {
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

  get rest(): string | undefined {
    return this.currentSet?.[this.isLastSerie ? 'restAfter' : 'rest'];
  }

  get thisTimeStats(): Stats | undefined {
    return this.stats?.[this.setNumber - 1][0];
  }

  get lastTimeStats(): Promise<Stats> | undefined {
    return this.stats?.[this.setNumber - 1][1];
  }

  private get sets(): FullSet[] {
    return this.item.sets;
  }

  ngOnInit(): void {
    this.nativeService.keepAwake();

    if (this.shouldRecord) {
      this.stats = this.sets.map(set => this.recordsService.getStats(set));
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
    const { thisTimeStats, currentSet, serieNumber } = this;

    this.nativeService.notify();

    if (!this.shouldRecord || serieNumber > thisTimeStats.values.length) {
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
        currentSet,
        serieNumber,
        // FIXME: input validation
        this.numberService.toUnsignedInt(repetitions)
      );
    }
  }

  private getSeriesTotal(set: FullSet | undefined): number {
    if (!set) {
      return 1;
    }

    const { series, exercise } = set;
    return exercise.doubled ? series * 2 : series;
  }

  private show(
    shift: number,
    serieNumber: number,
    shouldChangeSet: boolean
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
  private recordValue(
    stats: Stats,
    set: FullSet,
    serie: number,
    value: number
  ): Promise<number> {
    this.recordsService.setSerieValue(stats, serie, value);

    return this.recordsService.save(
      this.recordsService.create(set, serie, value, this.startDate)
    );
  }
}
