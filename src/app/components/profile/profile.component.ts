import { Component, OnInit } from '@angular/core';
import ProfileModel from 'src/app/models/Profile/ProfileModel';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: string = 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  profileDetails!: ProfileModel

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProfileDetails()
  }

  private getProfileDetails(): void {
    const path: Array<string> =  window.location.pathname.split('/')
    let index: number = 1
    if (path.length === 4) {
      index = 2
    }
    const profileId: number = Number(path[path.length - index])
    this.userService.getProfileById(profileId).subscribe((item: ProfileModel) => {
      this.profileDetails = item
    })
  }

}
