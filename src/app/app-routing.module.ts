import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './_components/landing/landing.component';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
