import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    IonicModule,
    ListComponent
  ],
  declarations: [
    ListComponent
  ]
})
export class ComponentsModule {}
