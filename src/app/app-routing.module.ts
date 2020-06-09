import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './_components/landing/landing.component';
import { MainComponent } from './_components/dashboard/main/main.component';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
