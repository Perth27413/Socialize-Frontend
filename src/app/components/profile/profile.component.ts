import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  userDetails!: UserModel
  profileDetails!: ProfileModel
  isOwner: boolean = false
  paramId: number = 0

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setParamUserId()
    this.userDetails = this.userService.getUserDetails()
    this.getProfileDetails()
    this.checkIsOwner()
  }

  private setParamUserId(): void {
    this.route.params.subscribe(params => {
      this.paramId = Number(params.id)
    })
  }

  private checkIsOwner(): void {
    this.route.params.subscribe(params => {
      this.isOwner = params.id === this.userDetails.id.toString()
    })
  }

  private getProfileDetails(): void {
    this.userService.getProfileById(this.paramId).subscribe((item: ProfileModel) => {
      this.profileDetails = item
    })
  }

}
