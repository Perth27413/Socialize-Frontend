import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLogin: boolean = false
  showSideBar: boolean = false

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { 
      // get isLogin
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
