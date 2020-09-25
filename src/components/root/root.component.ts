import { Component } from '@angular/core';

import { NativeService } from '../../services/native.service';

@Component({
  selector: 'app-root',
  templateUrl: 'root.component.html'
})
export class RootComponent {
  constructor(nativeService: NativeService) {
    nativeService.initialize();
  }
}
