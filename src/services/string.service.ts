import { Injectable } from '@angular/core';

@Injectable()
export class StringService {
  formatTuple(valueA: string, valueB: string): string {
    return valueA === valueB ? valueA : `${valueA}/${valueB}`;
  }
}
