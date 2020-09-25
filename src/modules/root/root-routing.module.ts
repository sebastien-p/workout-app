import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'training',
    loadChildren: () =>
      import('../training/training.module').then(
        exports => exports.TrainingModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then(exports => exports.AdminModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'training' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class RootRoutingModule {}
