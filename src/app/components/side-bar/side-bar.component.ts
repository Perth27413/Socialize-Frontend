import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
 
  userDetails!: UserModel
  menuList: {icon: string, name: string, isActive: boolean}[] = [
    {icon: 'fas fa-home', name: 'Home', isActive: true},
    {icon: 'fas fa-users', name: 'Follows', isActive: false},
    {icon: 'fas fa-star', name: 'Favorites', isActive: false}
  ]

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
  }

  public selectMenu(index: number): void {
    this.menuList.forEach(item => item.isActive = false)
    this.menuList[index].isActive = true
  }

  public logout(): void {
    this.userService.setLogout()
    this.router.navigateByUrl('/login')
  }
}
