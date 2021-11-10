import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails!: UserModel
  userProfile: string = 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
    console.log(this.userDetails);
    
  }

}
