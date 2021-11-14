import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sigin-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EditproflieComponent } from './components/editproflie/editproflie.component';
import { GraphComponent } from './components/graph/graph.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { FollowsComponent } from './components/follows/follows.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'profile/:id', component: ProfileLayoutComponent },
  { path: 'profile/:id/edit', component: ProfileLayoutComponent },
  { path: 'follows', component: FollowsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignInComponent, SignUpComponent, HomeComponent, ProfileLayoutComponent]
