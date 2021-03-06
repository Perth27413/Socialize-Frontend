import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { FacebookUserModel } from 'src/app/models/User/Facebook/FacebookUserModel';
import { GoogleUserModel } from 'src/app/models/User/OAuth/GoogleUserModel';
import RegisterRequestModel from 'src/app/models/User/RegisterRequestModel';
import UserModel from 'src/app/models/User/UserModel';
import RegisterValidateModel from 'src/app/models/Validate/RegisterValidateModel';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false
  birthDate!: Date
  registerRequest: RegisterRequestModel = new RegisterRequestModel
  validate: RegisterValidateModel = new RegisterValidateModel

  constructor(private router: Router, private notifyService: NotifyService, private userService: UserService, private authService: SocialAuthService) { }

  ngOnInit(): void {
  }

  public loginWithGoogle(): void {
    try {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response: GoogleUserModel) => {
        const request: RegisterRequestModel = this.mapGoogleModelToRegisterRequestModel(response)
        this.userService.register(request).subscribe((response: UserModel) => {
          this.userService.setLogin(response)
          this.router.navigateByUrl('/')
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  public loginWithFacebook(): void {
    try {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((response: FacebookUserModel) => {
        const request: RegisterRequestModel = this.mapFacebookModelToRegisterRequestModel(response)
        this.userService.register(request).subscribe((response: UserModel) => {
          this.userService.setLogin(response)
          this.router.navigateByUrl('/')
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  private mapFacebookModelToRegisterRequestModel(user: FacebookUserModel): RegisterRequestModel {
    const newUser: RegisterRequestModel = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      pictureProfile: user.photoUrl,
      typeId: 3,
      birthDay: new Date().toISOString(),
      username: '',
      password: '',
      phoneNumber: ''
    }
    return newUser
  }

  private mapGoogleModelToRegisterRequestModel(user: GoogleUserModel): RegisterRequestModel {
    const newUser: RegisterRequestModel = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      pictureProfile: user.photoUrl,
      typeId: 2,
      birthDay: new Date().toISOString(),
      username: '',
      password: '',
      phoneNumber: ''
    }
    console.log(newUser)
    return newUser
  }

  public goToSignIn(): void {
    this.router.navigateByUrl('/login')
  }

  public onRegister(typeId: number): void {
    try {
      this.registerRequest.typeId = typeId
      if (this.birthDate) {
        this.registerRequest.birthDay = this.birthDate.toISOString()
      }
      if (this.validateFields()) {
        this.isLoading = true
        const newRequest: RegisterRequestModel = {...this.registerRequest}
        newRequest.password = new Md5().appendStr(newRequest.password).end().toString()
        this.userService.register(newRequest).subscribe((response: UserModel) => {
          setTimeout(async () => {
            if (response) {
              await this.notifyService.sweetSuccess('Sign up Successfully')
              this.router.navigateByUrl('/login')
            } else {
              this.notifyService.sweetWarning('Sign up failed')
            }
            this.isLoading = false
          }, 1000)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  public validateOnInput(key: string): boolean {
    let isValid: boolean = false
    switch (key) {
      case 'username':
        this.validate.userIsValid = this.registerRequest['username'].length > 3 ? true : false
        isValid = this.validate.userIsValid
        break
      case 'password':
        this.validate.passIsValid = this.registerRequest['password'].length >= 8 ? true : false
        isValid = this.validate.passIsValid
        break
      case 'email':
        this.validate.emailIsValid = this.checkEmailFormat(this.registerRequest['email'])
        isValid = this.validate.emailIsValid
        break
      case 'firstName':
        this.validate.firstNameIsValid = this.registerRequest['firstName'].length >= 3 ? true : false
        isValid = this.validate.firstNameIsValid
        break
      case 'lastName':
        this.validate.lastNameIsValid = this.registerRequest['lastName'].length >= 3 ? true : false
        isValid = this.validate.lastNameIsValid
        break
      case 'phoneNumber':
        this.validate.phoneIsValid = this.registerRequest['phoneNumber'].length == 10 ? true : false
        isValid = this.validate.phoneIsValid
        break
      case 'birthDay':
        this.validate.birthDayIsValid = this.birthDate ? true : false
        isValid = this.validate.birthDayIsValid
        break
      default:
        break
    }
    return isValid
  }

  private validateFields(): boolean {
    let isValid = true
    let validate: Array<string> = ['username', 'password', 'email', 'firstName', 'lastName', 'phoneNumber', 'birthDay']
    validate.forEach((item: string) => {
      for (const [key, value] of Object.entries(this.registerRequest)) {
        if (item === key) {
          if (!this.validateOnInput(key)) {
            this.notifyService.warning(`${this.formatToCapitalCase(key)} is invalid`)
            isValid = false
          }  
        }
      }
    })
    return isValid
  }

  private formatToCapitalCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  private checkEmailFormat(email: string): boolean {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
  }

  public numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
