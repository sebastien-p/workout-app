import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { StringService } from './string.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private readonly stringService: StringService) {}

  downloadJSON<T>(name: string, data: T[]): void {
    return saveAs(
      new Blob([this.stringService.toJSON(data)], { type: 'application/json' }),
      name + '.json'
    );
  }

  async getJSON<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onload = () => resolve(JSON.parse(reader.result as string));
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}
