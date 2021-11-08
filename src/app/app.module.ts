import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { EditproflieComponent } from './components/editproflie/editproflie.component';
import { CalendarModule } from 'primeng/calendar';
import { SignUpComponent } from './components/sigin-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from  '@angular/common/http';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    SideBarComponent,
    ProfileComponent,
    ViewProfileComponent,
    PostComponent,
    HomeComponent,
    EditproflieComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    SliderModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }