import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
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
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html'
})
export class CountdownComponent
implements OnInit{
  @Input()
  readonly pauseable: Pauseable;

  countdown: Observable<string>;

  ngOnInit(): void {
    this.stop();
  }

  stop(): void {
    this.countdown = of(this.pauseable.rest);
  }

  play(): void {
    const duration: number = this.parse(this.pauseable.rest); // FIXME
    this.countdown = interval(second).pipe(
      takeUntil(timer(duration)),
      map(seconds => duration - (seconds * second)),
      map(duration => this.format(duration))
    );
  }

  private parse(value: string): number {
    const [h, m, s] = value.split(separator).map(n => parseInt(n, 10));
    return (s * second) + (m * minute) + (h * hour);
  }

  private format(value: number): string {
    const h = (value / hour) % hoursInDay;
    const m = (value / minute) % minutesInHour;
    const s = (value / second) % secondsInMinute;
    return [h, m, s].map(n => n.toFixed(0).padStart(2, '0')).join(separator);
  }
}
