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
  setNumber: number;
  serieNumber: number;

  thisTimeStats?: Stats;
  lastTimeStats?: Promise<Stats>;

  private readonly startDate: string;

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

  ngOnInit(): void {
    this.nativeService.keepAwake();
    this.initialize(1, 1);
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

  private get sets(): FullSet[] {
    return this.item.sets;
  }

  private getSeriesTotal(set: FullSet | undefined): number {
    if (!set) {
      return 1;
    }

    const { series, exercise } = set;
    return exercise.doubled ? series * 2 : series;
  }

  private initialize(setNumber: number, serieNumber: number): void {
    this.setNumber = setNumber;
    this.serieNumber = serieNumber;

    if (this.shouldRecord) {
      [
        this.thisTimeStats,
        this.lastTimeStats
      ] = this.recordsService.createStatsTuple(this.currentSet);
    }
  }

  private show(
    shift: number,
    serieNumber: number,
    shouldInitializeSet: boolean
  ): void {
    this.countdown?.stop();

    if (shouldInitializeSet) {
      this.initialize(this.setNumber + shift, serieNumber);
    } else {
      this.serieNumber += shift;
    }
  }

  async promptRepetitions(): Promise<void> {
    const serieNumber: number = this.serieNumber;

    if (!this.shouldRecord || serieNumber > this.thisTimeStats.values.length) {
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
        // FIXME: input validation
        this.numberService.toUnsignedInt(repetitions),
        serieNumber
      );
    }
  }

  private recordValue(value: number, serieNumber: number): Promise<number> {
    this.recordsService.setSerieValue(this.thisTimeStats, serieNumber, value);

    return this.recordsService.save(
      this.recordsService.create(
        this.currentSet,
        serieNumber,
        value,
        this.startDate
      )
    );
  }
}
