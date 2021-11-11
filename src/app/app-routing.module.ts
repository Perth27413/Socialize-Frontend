import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sigin-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { EditproflieComponent } from './components/editproflie/editproflie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'profile/:id', component: ViewProfileComponent },
  { path: 'profile/1/edit', component: EditproflieComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignInComponent, SignUpComponent, HomeComponent, ViewProfileComponent]
