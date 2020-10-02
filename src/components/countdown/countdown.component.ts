import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map, scan, take, tap } from 'rxjs/operators';

import { millisInSecond, DateService } from '../../services/date.service';
import { NativeService } from '../../services/native.service';

const warnings = 6;

@Component({
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html'
})
export class CountdownComponent implements OnChanges {
  @Input()
  readonly rest: string;

  @Output()
  readonly started: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly completed: EventEmitter<void> = new EventEmitter();

  value: Observable<string> | null;

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
    if (this.isPlaying) {
      return;
    }

    this.started.emit();

    if (!this.duration) {
      return this.onComplete();
    }

    this.value = timer(millisInSecond, millisInSecond).pipe(
      scan(value => value - 1, this.duration),
      tap(value => this.onTick(value)),
      map(value => this.dateService.formatTime(value)),
      take(this.duration)
    );
  }

  private initialize(): void {
    this.stop();
    this.duration = this.dateService.parseTime(this.rest);
  }

  private onTick(value: number): void {
    if (warnings > 0 && this.duration >= warnings && value < warnings) {
      this.nativeService.notify();
    }

    if (!value) {
      this.onComplete();
    }
  }

  private onComplete(): void {
    this.stop();
    this.completed.emit();
  }
}
