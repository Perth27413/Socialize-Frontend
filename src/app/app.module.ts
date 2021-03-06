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
import { PopularPeopleComponent } from './components/popular-people/popular-people.component';
import { LazyLoadingComponent } from './components/lazy-loading/lazy-loading.component';
import { StoryComponent } from './components/story/story.component';
import { GraphComponent } from './components/graph/graph.component';
import {ChartModule} from 'primeng/chart';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { FollowsComponent } from './components/follows/follows.component';
import { StoryPopupComponent } from './components/story/story-popup/story-popup.component';
import { SlideshowImagesComponent } from './components/slideshow-images/slideshow-images.component';
import {GalleriaModule} from 'primeng/galleria';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingImageComponent } from './components/loading-image/loading-image.component';
import { FacebookLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

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
    SignInComponent,
    PopularPeopleComponent,
    LazyLoadingComponent,
    StoryComponent,
    GraphComponent,
    ProfileLayoutComponent,
    FollowsComponent,
    StoryPopupComponent,
    SlideshowImagesComponent,
    LoadingComponent,
    LoadingImageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    SliderModule,
    ChartModule,
    GalleriaModule,
    DropdownModule,
    AutoCompleteModule,
    SocialLoginModule
  ],
  bootstrap: [AppComponent],
  providers: [CookieService, SocialLoginModule,
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '66566557868-acboo6tof3bi3395b2ps2u3chjjmot7r.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('219786896894894')
        }
      ]
    } as SocialAuthServiceConfig,
  }
  ]
})
export class AppModule { }