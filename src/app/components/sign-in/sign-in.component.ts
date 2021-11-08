import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LoginRequestModel from 'src/app/models/User/LoginRequestModel';
import UserModel from 'src/app/models/User/UserModel';
import LoginValidateModel from 'src/app/models/Validate/LoginValidateModel';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';
import {Md5} from 'ts-md5/dist/md5'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginRequest: LoginRequestModel = new LoginRequestModel
  isLoading: boolean = false
  validate: LoginValidateModel = {
    userIsValid: null,
    passIsValid: null
  }

  constructor(private router: Router, private userService: UserService, private notifyService: NotifyService) { }

  ngOnInit(): void {
  }

  public goToSignUp(): void {
    this.router.navigateByUrl('/register')
  }

  public onLogin(): void {
    try {
      if (this.validateFields()) {
        this.isLoading = true
        const newRequest: LoginRequestModel = {...this.loginRequest}
        newRequest.password = new Md5().appendStr(newRequest.password).end().toString()
        this.userService.login(newRequest).subscribe((response: UserModel) => {
          setTimeout(() => {
            if (response.id) {
              this.userService.setLogin(response)
              this.notifyService.success('Sign in Successfully')
              setTimeout(() => {
                this.router.navigateByUrl('/')
              }, 1000)
            } else {
              this.notifyService.warning('Username or Email does not exist')
            }
            this.isLoading = false
          }, 1000)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  private validateFields(): boolean {
    let isValid: boolean = true
    for (const [key, value] of Object.entries(this.loginRequest)) {
      if (!value) {
        this.validateOnInput(key)
        isValid = false
        this.notifyService.warning(`${key} is invalid !!!`)
      }
    }
    return isValid
  }

  public validateOnInput(key: string): void {
    switch (key) {
      case 'username':
        this.validate.userIsValid = this.loginRequest['username'] ? true : false
        break
      case 'password':
        this.validate.passIsValid = this.loginRequest['password'].length >= 8 ? true : false
        break
      default:
        break
    }
  }

}
