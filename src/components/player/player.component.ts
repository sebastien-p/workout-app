import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { timer } from 'rxjs/observable/timer';
import { takeUntil } from 'rxjs/operators/takeuntil';

import { Pauseable } from '../../models/pauseable.model';

const secondsInMinute: number = 60;
const minutesInHour: number = secondsInMinute;
const hoursInDay: number = 24;
const second: number = 1000;
const minute: number = second * secondsInMinute;
const hour: number = minute * minutesInHour;
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
    this.countdown = of(this.pauseable.rest);
  }

  play(): void { // FIXME
    const duration: number = this.parse(this.pauseable.rest);
    this.countdown = timer(0, second).pipe(
      takeUntil(timer(duration + second)),
      map(seconds => duration - (seconds * second)),
      map(duration => this.format(duration))
    );
  }

  private parse(value: string): number {
    const [h, m, s] = value.split(separator).map(n => parseInt(n, 10));
    return (s * second) + (m * minute) + (h * hour);
  }

  private format(value: number): string {
    return [
      (value / hour) % hoursInDay,
      (value / minute) % minutesInHour,
      (value / second) % secondsInMinute
    ].map(n => Math.floor(n).toString().padStart(2, '0')).join(separator);
  }
}
