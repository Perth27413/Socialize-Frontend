import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
<<<<<<< HEAD
import { LayoutComponent } from './components/layout/layout.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ViewProfileComponent }
=======
import { SignUpComponent } from './components/sigin-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent }
>>>>>>> origin/main
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
<<<<<<< HEAD
export const routingComponents = [LayoutComponent, HomeComponent, ViewProfileComponent]
=======
export const routingComponents = [SignInComponent, SignUpComponent, HomeComponent, ProfileComponent]
>>>>>>> origin/main
