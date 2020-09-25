import { Injectable } from '@angular/core';

const hoursInDay = 24;
const secondsInMinute = 60;
const minutesInHour: number = secondsInMinute;
const secondsInHour: number = secondsInMinute * minutesInHour;
const timeSeparator = ':';
export const millisInSecond = 1000;

@Injectable({
  providedIn: 'root'
})
export class DateService {
  parseTime(value: string): number {
    const [h, m, s] = value.split(timeSeparator).map(n => parseInt(n, 10));
    return h * secondsInHour + m * secondsInMinute + s;
  }

  formatTime(value: number): string {
    return [
      (value / secondsInHour) % hoursInDay,
      (value / secondsInMinute) % minutesInHour,
      value % secondsInMinute
    ]
      .map(n => Math.floor(n).toString().padStart(2, '0'))
      .join(timeSeparator);
  }

  getISODate(date: string | number = Date.now()): string {
    const normalized: Date = new Date(date);
    normalized.setSeconds(0);
    normalized.setMilliseconds(0);
    return normalized.toISOString();
  }
}
