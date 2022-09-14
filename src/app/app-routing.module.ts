import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './modules/application/application/application.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    loadChildren: () => import('./modules/application/application.module').then(m => m.ApplicationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
