import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  toUnsignedInt(value: number | string): number {
    if (typeof value === 'string') {
      value = parseInt(value.trim(), 10);
    }

    return Math.abs(Math.floor(value)) || 0;
  }

  clamp(value: number, min: number = 0): number {
    return Math.max(min, value);
  }
}
