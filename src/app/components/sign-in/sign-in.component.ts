import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LoginRequestModel from 'src/app/models/User/LoginRequestModel';
import UserModel from 'src/app/models/User/UserModel';
import LoginValidateModel from 'src/app/models/Validate/LoginValidateModel';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';
import {Md5} from 'ts-md5/dist/md5'
import Swal from 'sweetalert2'
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { GoogleUserModel } from 'src/app/models/User/OAuth/GoogleUserModel';
import { FacebookUserModel } from 'src/app/models/User/Facebook/FacebookUserModel';

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

  constructor(private authService: SocialAuthService, private router: Router, private userService: UserService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    
  }

  public async loginWithGoogle(): Promise<void> {
    try {
      const user: GoogleUserModel = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      const request: LoginRequestModel = {
        username: user.email,
        password: '',
        typeId: 2
      }
      this.socialLogin(request)
    } catch (error) {
      console.error(error)
    }
  }

  public async loginWithFacebook(): Promise<void> {
    try {
      const user: FacebookUserModel = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      const request: LoginRequestModel = {
        username: user.email,
        password: '',
        typeId: 3
      }
      this.socialLogin(request)
    } catch (error) {
      console.error(error)
    }
  }

  private socialLogin(request: LoginRequestModel): void {
    this.userService.login(request).subscribe((response: UserModel) => {
      this.userService.setLogin(response)
      this.router.navigateByUrl('/')
    })
  }

  public goToSignUp(): void {
    this.router.navigateByUrl('/register')
  }

  public onLogin(): void {
    try {
      if (this.validateFields()) {
        this.isLoading = true
        const newRequest: LoginRequestModel = {...this.loginRequest}
        newRequest.typeId = 1
        newRequest.password = new Md5().appendStr(newRequest.password).end().toString()
        this.userService.login(newRequest).subscribe((response: UserModel) => {
          setTimeout(async () => {
            if (response.id) {
              this.userService.setLogin(response)
              await this.notifyService.sweetSuccess('Sign in Successfully')
              this.router.navigateByUrl('/')
            } else {
              this.notifyService.sweetWarning('Username or Email does not exist')
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
