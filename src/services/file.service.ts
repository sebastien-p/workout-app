import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  downloadJSON<T>(name: string, data: T[]): void {
    return saveAs(
      new Blob([this.toJSON(data)], { type: 'application/json' }),
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

  private toJSON(data: object): string {
    return JSON.stringify(data, (key, value) => {
      if (!(value instanceof Blob)) {
        return value;
      }
    });
  }
}
