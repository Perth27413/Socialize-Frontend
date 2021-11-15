import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import UserModel from 'src/app/models/User/UserModel';
import PopularResponseModel from 'src/app/models/Follow/PopularResponseModel';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss'],
})
export class PopularPeopleComponent implements OnInit {
  popularPeople!: Array<PopularResponseModel>
  userDetails: UserModel = new UserModel

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails();
    this.userService.getPopularPeopleById(this.userDetails.id).subscribe((item: Array<PopularResponseModel>) => {
      this.popularPeople = item
    })
  }

  public onProfileNameClick(userId: number): void {
    window.location.href = '/profile/' + userId
  }

}
