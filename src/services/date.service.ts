import { Injectable } from '@angular/core';

export const millisInSecond: number = 1000;
const secondsInMinute: number = 60;
const millisInMinute: number = millisInSecond * secondsInMinute;
const minutesInHour: number = secondsInMinute;
const secondsInHour: number = secondsInMinute * minutesInHour;
const hoursInDay: number = 24;
export const offset: number = new Date().getTimezoneOffset() * -millisInMinute;
const timeSeparator: string = ':';

@Injectable()
export class DateService {
  parseTime(value: string): number {
    const [h, m, s] = value.split(timeSeparator).map(n => parseInt(n, 10));
    return (h * secondsInHour) + (m * secondsInMinute) + s;
  }

  formatTime(value: number): string {
    return [
      (value / secondsInHour) % hoursInDay,
      (value / secondsInMinute) % minutesInHour,
      value % secondsInMinute
    ].map(n => Math.floor(n).toString().padStart(2, '0')).join(timeSeparator);
  }

  shiftISODate(date: string, shift: number): string {
    return new Date(new Date(date).getTime() + shift).toISOString();
  }
}
