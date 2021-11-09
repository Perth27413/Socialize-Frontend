import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLogin: boolean = this.userService.getLogin()
  showSideBar: boolean = false

  constructor(private router: Router, private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { 
      this.isLogin = this.userService.getLogin()
      console.log(this.isLogin)
      return false 
    }
  }

  ngOnInit(): void {
    this.checkIsLoginAndNavigateToLogin()
  }

  public checkIsLoginAndNavigateToLogin(): void {
    if (!this.isLogin) {
      const pathName: string = window.location.pathname
      switch (pathName) {
        case '/login':
          this.router.navigateByUrl(pathName)
          break;
        case '/register':
          this.router.navigateByUrl(pathName)
          break;
        default:
          this.router.navigateByUrl('/login')
          break;
      }
    } else {
      const pathName: string = window.location.pathname
      if (pathName === '/login' || pathName === '/register') {
        this.router.navigateByUrl('/')
      }
    }
  }

  public toggleSideBar(): void {
    this.showSideBar = !this.showSideBar
  }

}
