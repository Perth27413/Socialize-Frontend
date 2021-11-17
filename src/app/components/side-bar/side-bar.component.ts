import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import SideBarMenuModel from 'src/app/models/SideBarMenuModel';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
 
  userDetails!: UserModel
  menuList: Array<SideBarMenuModel> = [
    {icon: 'fas fa-home', name: 'Home', isActive: false, path: '/'},
    {icon: 'fas fa-users', name: 'Follows', isActive: false, path: '/follows'},
  ]

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
    this.checkPath()
    this.checkIsAdmin()
  }

  private checkIsAdmin(): void {
    if (this.userDetails.typeId === 1) {
      this.menuList.push({icon: 'fas fa-chart-pie', name: 'Dashboard', isActive: false, path: '/graph'})
    }
  }

  private checkPath(): void {
    this.menuList.forEach((item: SideBarMenuModel) => {
      if (item.path === window.location.pathname) {
        item.isActive = true
      }
    })
  }

  public selectMenu(index: number): void {
    this.router.navigateByUrl(this.menuList[index].path)
    this.menuList.forEach(item => item.isActive = false)
    this.menuList[index].isActive = true
  }

  public logout(): void {
    this.userService.setLogout()
    window.location.href = '/login'
  }

  public onProfileClick(): void {
    window.location.href = '/profile/' + this.userDetails.id
  }
}
