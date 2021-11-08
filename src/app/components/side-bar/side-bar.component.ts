import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  menuList: {icon: string, name: string, isActive: boolean}[] = [
    {icon: 'fas fa-home', name: 'Home', isActive: true},
    {icon: 'fas fa-users', name: 'Follows', isActive: false},
    {icon: 'fas fa-star', name: 'Favorites', isActive: false}
  ]

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {}

  selectMenu(index: number) {
    console.log(index)
    switch (index) {
      case 0:
        this.menuList[0].isActive = true;
        this.menuList[1].isActive = false;
        this.menuList[2].isActive = false;
        break;
      case 1:
        this.menuList[0].isActive = false;
        this.menuList[1].isActive = true;
        this.menuList[2].isActive = false;
        break;
      case 2:
        this.menuList[0].isActive = false;
        this.menuList[1].isActive = false;
        this.menuList[2].isActive = true;
        break;
      default:
        this.menuList[0].isActive = true;
        this.menuList[1].isActive = false;
        this.menuList[2].isActive = false;
        break;
    }
  }

  cardActive(index: number) {

    return {
      'card-active' : this.menuList[index].isActive,
      'text-active' : this.menuList[index].isActive
    }
  }

  public logout(): void {
    this.userService.setLogout()
    this.router.navigateByUrl('/login')
  }
  

}
