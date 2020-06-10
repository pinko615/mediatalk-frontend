import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './_components/landing/landing.component';
import { AuthNavComponent } from './_components/navigation/auth-nav/auth-nav.component';
import { GuestNavComponent } from './_components/navigation/guest-nav/guest-nav.component';
import { MainComponent } from './_components/dashboard/main/main.component';
import { SidebarComponent } from './_components/dashboard/sidebar/sidebar.component';
import { FooterComponent } from './_components/dashboard/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignInComponent } from './_components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './_components/auth/sign-up/sign-up.component';
import { ProfileComponent } from './_components/dashboard/profile/profile.component';
import { SettingsComponent } from './_components/dashboard/settings/settings.component';
import { FriendsComponent } from './_components/dashboard/friends/friends.component';
import { GuestFooterComponent } from './_components/navigation/guest-footer/guest-footer.component';
import { UserProfileComponent } from './_components/dashboard/user-profile/user-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthGuard } from './_guards/auth.guards';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthNavComponent,
    GuestNavComponent,
    MainComponent,
    SidebarComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    SettingsComponent,
    FriendsComponent,
    GuestFooterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [AuthGuard, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
