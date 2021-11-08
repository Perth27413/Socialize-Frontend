import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LoginRequestModel from 'src/app/models/User/LoginRequestModel';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginRequest: LoginRequestModel = new LoginRequestModel
  isLoading: boolean = false

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.hello()
  }

  public goToSignUp(): void {
    this.router.navigateByUrl('/register')
  }

  public onLogin(): void {
    try {
      this.userService.login(this.loginRequest).subscribe((response: UserModel) => {
        if (response.id) {
          this.userService.setLogin(response)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
