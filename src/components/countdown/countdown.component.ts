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

import { Pauseable } from '../../models/pauseable.model';

const millisecondsInSecond: number = 1000;
const secondsInMinute: number = 60;
const minutesInHour: number = secondsInMinute;
const secondsInHour: number = secondsInMinute * minutesInHour;
const hoursInDay: number = 24;
const separator: string = ':';
const warnings: number = 3;

@Component({
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html'
})
export class CountdownComponent
implements OnChanges { // TODO: play/stop security?
  @Input()
  readonly pauseable: Pauseable;

  @Output()
  readonly onStart: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly onEnd: EventEmitter<void> = new EventEmitter();

  value: Observable<string>;

  private duration: number;

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
    this.value = timer(millisecondsInSecond, millisecondsInSecond).pipe(
      scan(value => value - 1, this.duration),
      tap(value => this.onTick(value)),
      map(value => this.format(value)),
      take(this.duration)
    );
  }

  private parse(value: string): number {
    const [h, m, s] = value.split(separator).map(n => parseInt(n, 10));
    return (h * secondsInHour) + (m * secondsInMinute) + s;
  }

  private format(value: number): string {
    return [
      (value / secondsInHour) % hoursInDay,
      (value / secondsInMinute) % minutesInHour,
      value % secondsInMinute
    ].map(n => Math.floor(n).toString().padStart(2, '0')).join(separator);
  }

  private initialize() {
    this.duration = this.parse(this.pauseable.rest);
    this.stop();
  }

  private notify(): void {// TODO
    if (warnings < 1 || this.duration < warnings) { return; }
    console.log('notified');
    navigator.vibrate(200);
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
