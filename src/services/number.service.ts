import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {
  toUnsignedInt(value: number, min: number = 0): number {
    return Math.abs(Math.floor(value) || min);
  }

  parseUnsignedInt(value: string, min?: number): number {
    return this.toUnsignedInt(parseInt(value, 10), min);
  }
}
