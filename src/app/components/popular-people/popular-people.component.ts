import { Component, OnInit } from '@angular/core';
import ProfileModel from 'src/app/models/Profile/ProfileModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss'],
})
export class PopularPeopleComponent implements OnInit {
  popularPeople: ProfileModel = new ProfileModel

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const path: Array<string> =  window.location.pathname.split('/')
    const profileId: number = Number(path[path.length - 1])
    this.userService.getPopularPeopleById(4).subscribe((item: ProfileModel) => {
      this.popularPeople = item
      console.log(this.popularPeople)
    });
  }
}
