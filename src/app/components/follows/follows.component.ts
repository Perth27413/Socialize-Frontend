import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import ProfileModel from 'src/app/models/Profile/ProfileModel';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {

  profileDetails!: Array<ProfileModel>
  isOwner: boolean = false
  paramId: number = 0
  isLoading: boolean = true

  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    this.getFollowDetails()
    this.setLoading()
  }

  private setLoading(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  }

  private getFollowDetails(): void {
    this.userService.getfollowById().subscribe((item: Array<ProfileModel>) => {
      this.profileDetails = item
      console.log(this.profileDetails);
      
    })
  }

  public onFollowClick(index : number): void {
    this.userService.follow(this.profileDetails[index].userId).subscribe((item: ProfileModel) => {
      this.profileDetails[index] = item
    })
  }
}
