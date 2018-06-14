import { Component, Type } from '@angular/core';

import { NativeService } from '../services/native.service';
import { ExploitPage } from '../pages/exploit/exploit.page';
import { AdminPage } from '../pages/admin/admin.page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  readonly exploitPage: Type<ExploitPage> = ExploitPage;
  readonly adminPage: Type<AdminPage> = AdminPage;

  constructor(
    nativeService: NativeService
  ) {
    nativeService.initialize();
  }
}
