import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './_components/landing/landing.component';
import { AuthNavComponent } from './_components/navigation/auth-nav/auth-nav.component';
import { GuestNavComponent } from './_components/navigation/guest-nav/guest-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthNavComponent,
    GuestNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
