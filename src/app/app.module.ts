import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    SideBarComponent,
    ProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }