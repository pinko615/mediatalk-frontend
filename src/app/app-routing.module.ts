import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './_components/landing/landing.component';
import { MainComponent } from './_components/dashboard/main/main.component';
import { SignInComponent } from './_components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './_components/auth/sign-up/sign-up.component';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  }
  ,
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
