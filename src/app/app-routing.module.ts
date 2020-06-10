import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './_components/landing/landing.component';
import { MainComponent } from './_components/dashboard/main/main.component';
import { SignInComponent } from './_components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './_components/auth/sign-up/sign-up.component';
import { ProfileComponent } from './_components/dashboard/profile/profile.component';
import { SettingsComponent } from './_components/dashboard/settings/settings.component';
import { FriendsComponent } from './_components/dashboard/friends/friends.component';
import { UserProfileComponent } from './_components/dashboard/user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guards';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'friends',
    component: FriendsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'user/:lastName',
    component: UserProfileComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
