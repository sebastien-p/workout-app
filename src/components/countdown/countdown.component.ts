import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map } from 'rxjs/operators/map';
import { scan } from 'rxjs/operators/scan';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';

import { millisInSecond, DateService } from '../../services/date.service';
import { NativeService } from '../../services/native.service';

const warnings: number = 4;

@Component({
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html'
})
export class CountdownComponent implements OnChanges {
  @Input()
  readonly rest: string;

  @Output()
  readonly onStart: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly onEnd: EventEmitter<void> = new EventEmitter();

  value: Observable<string>;

  private duration: number;

  constructor(
    private readonly dateService: DateService,
    private readonly nativeService: NativeService
  ) {}

  ngOnChanges(): void {
    this.initialize();
  }

  get isPlaying(): boolean {
    return !!this.value;
  }

  stop(): void {
    this.value = null;
  }

  play(): void {
    if (this.isPlaying) { return; }
    this.onStart.emit();
    if (!this.duration) { return this.onComplete(); }
    this.value = timer(millisInSecond, millisInSecond).pipe(
      scan(value => value - 1, this.duration),
      tap(value => this.onTick(value)),
      map(value => this.dateService.formatTime(value)),
      take(this.duration)
    );
  }

  private initialize() {
    this.duration = this.dateService.parseTime(this.rest);
    this.stop();
  }

  private notify(): void {
    const shouldNotify: boolean = warnings > 0 && this.duration >= warnings;
    if (shouldNotify) { this.nativeService.notify(); }
  }

  private onComplete(): void {
    this.stop();
    this.onEnd.emit();
  }

  private onTick(value: number): void {
    if (value < warnings) { this.notify(); }
    if (!value) { this.onComplete(); }
  }
}
