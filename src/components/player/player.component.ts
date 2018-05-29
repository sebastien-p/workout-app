import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { scan } from 'rxjs/operators/scan';
import { take } from 'rxjs/operators/take';
import { timer } from 'rxjs/observable/timer';

import { Pauseable } from '../../models/pauseable.model';

const millisecondsInSecond: number = 1000;
const secondsInMinute: number = 60;
const minutesInHour: number = secondsInMinute;
const secondsInHour: number = secondsInMinute * minutesInHour;
const hoursInDay: number = 24;
const separator: string = ':';

@Component({
  selector: 'app-player',
  templateUrl: 'player.component.html'
})
export class PlayerComponent
implements OnChanges{
  @Input()
  readonly pauseable: Pauseable;

  @Output()
  readonly onGoFirst: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly onGoLast: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly onGoPrevious: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly onGoNext: EventEmitter<void> = new EventEmitter();

  countdown: Observable<string>;

  ngOnChanges({ pauseable }: SimpleChanges): void {
    if (pauseable.currentValue !== pauseable.previousValue) { this.stop(); }
  }

  stop(): void {
    this.countdown = null;
  }

  play(): void {
    const time: number = this.parse(this.pauseable.rest);
    this.countdown = timer(millisecondsInSecond, millisecondsInSecond).pipe(
      take(time),
      scan(value => value - 1, time),
      map(value => this.format(value))
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
}
