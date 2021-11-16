import { Component, OnInit } from '@angular/core';
import EditRequestModel from 'src/app/models/User/EditProfileRequestModel';
import EditProfileValidateModel from 'src/app/models/Validate/EditProfileValidateModel';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';
import UserModel from 'src/app/models/User/UserModel';

@Component({
  selector: 'app-editproflie',
  templateUrl: './editproflie.component.html',
  styleUrls: ['./editproflie.component.scss']
})
export class EditproflieComponent implements OnInit {
  birthDate!: Date
  editUserRequest: EditRequestModel = new EditRequestModel
  validate: EditProfileValidateModel = new EditProfileValidateModel
  userDetails: UserModel = new UserModel

  constructor(private notifyService: NotifyService, private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
    this.birthDate = new Date(this.userDetails.birthday)
    console.log(this.userDetails)
  }

  onSaveChangedetails() {
    try {
      if (this.validateFields()) {
        this.userDetails.birthday = this.birthDate
        this.userService.editProfile(this.userDetails).subscribe((response: UserModel) => {
          setTimeout(async () => {
            if (response) {
              await this.notifyService.sweetSuccess('Change information Successfully')
              this.userService.setLogin(response)
            } else {
              this.notifyService.sweetWarning('Change information failed')
            }
          }, 1000)
        })
      } else {
        
      }
    } catch (error) {
      console.error(error)
    }
  }

  public validateOnInputDetails(key: string): boolean {
    let isValid: boolean = false
    switch (key) {
      case 'firstName':
        this.validate.firstNameIsValid = this.userDetails['firstName'].length >= 3 ? true : false
        isValid = this.validate.firstNameIsValid
        break
      case 'lastName':
        this.validate.lastNameIsValid = this.userDetails['lastName'].length >= 3 ? true : false
        isValid = this.validate.lastNameIsValid
        break
      case 'details':
        this.validate.detailsIsValid = this.userDetails['details'].length >= 3 ? true : false
        isValid = this.validate.detailsIsValid
        break
      case 'email':
        this.validate.emailIsValid = this.checkEmailFormat(this.userDetails['email'])
        isValid = this.validate.emailIsValid
        break
      case 'phoneNumber':
        this.validate.phoneIsValid = this.userDetails.phoneNumber.length === 10 ? true : false
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
    let validate: Array<string> = ['firstName', 'lastName', 'details', 'email', 'phoneNumber', 'birthDay']
    validate.forEach((item: string) => {
      for (const [key, value] of Object.entries(this.userDetails)) {
        if (item === key) {
          if (!this.validateOnInputDetails(key)) {
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

  public validateCanChange(): boolean {
    this.userDetails.birthday = this.birthDate
    return JSON.stringify(this.userDetails) !== JSON.stringify(this.userService.getUserDetails())
  }

}
