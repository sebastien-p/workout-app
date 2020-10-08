import { Component } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { DatabaseService } from '../../services/database.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: 'admin.page.html'
})
export class AdminPage {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly alertService: AlertService,
    private readonly fileService: FileService
  ) {}

  async exportDatabase(): Promise<void> {
    this.fileService.downloadJSON(
      'workout-app-export', // TODO
      await this.databaseService.export()
    );
  }

  async importDatabase(file: File): Promise<void> {
    if (await this.alertService.confirm()) {
      await this.databaseService.import(await this.fileService.getJSON(file));
    }
  }
}
