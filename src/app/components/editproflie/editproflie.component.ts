import { Component, OnInit } from '@angular/core';
import EditPassModel from 'src/app/models/User/EditPassModel';
import EditRequestModel from 'src/app/models/User/EditProfileRequestModel';
import EditProfileValidateModel from 'src/app/models/Validate/EditProfileValidateModel';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-editproflie',
  templateUrl: './editproflie.component.html',
  styleUrls: ['./editproflie.component.scss']
})
export class EditproflieComponent implements OnInit {
  birthDate!: Date
  editUserRequest: EditRequestModel = new EditRequestModel
  editPassRequest: EditPassModel = new EditPassModel
  validate: EditProfileValidateModel = new EditProfileValidateModel

  constructor(private notifyService: NotifyService) { }

  ngOnInit(): void {

  }

  onSaveChangedetails() {
    this.validateFields()
  }

  onSaveChangePassword() {
    this.validateFieldsPassword()
  }

  public validateOnInputDetails(key: string): void {
    switch (key) {
      case 'email':
        this.validate.emailIsValid = this.checkEmailFormat(this.editUserRequest['email'])
        break
      case 'firstName':
        this.validate.firstNameIsValid = this.editUserRequest['firstName'].length >= 3 ? true : false
        break
      case 'lastName':
        this.validate.lastNameIsValid = this.editUserRequest['lastName'].length >= 3 ? true : false
        break
      case 'details':
        this.validate.detailsIsValid = this.editUserRequest['details'].length >= 3 ? true : false
        break
      case 'phoneNumber':
        this.validate.phoneIsValid = this.editUserRequest['phoneNumber'].length == 10 ? true : false
        break
      case 'birthDay':
        this.validate.birthDayIsValid = this.birthDate ? true : false
        break
      default:
        break
    }
  }

  public validateOnInputPassword(key: string): void {
    switch (key) {
      case 'currentPassword':
        this.validate.currentPassIsValid = this.editPassRequest['currentPassword'].length >= 8 ? true : false
        break
      case 'retryPassword':
        this.validate.retryPassIsValid = this.editPassRequest['retryPassword'].length >= 8 ? true : false
        break
      case 'newPassword':
        this.validate.newPassIsValid = this.editPassRequest['newPassword'].length >= 8 ? true : false
        break
      default:
        break
    }
  }

  private validateFields(): boolean {
    let isValid = true
    for (const [key, value] of Object.entries(this.editUserRequest)) {
      if (!value) {
        this.validateOnInputDetails(key)
        this.notifyService.warning(`${this.formatToCapitalCase(key)} is invalid`)
        isValid = false
      }
    }
    return isValid
  }

  private validateFieldsPassword(): boolean {
    let isValid = true
    for (const [key, value] of Object.entries(this.editPassRequest)) {
      if (!value) {
        this.validateOnInputPassword(key)
        this.notifyService.warning(`${this.formatToCapitalCase(key)} is invalid`)
        isValid = false
      }
    }
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
