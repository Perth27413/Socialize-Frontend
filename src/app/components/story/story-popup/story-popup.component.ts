import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import UserModel from 'src/app/models/User/UserModel';

@Component({
  selector: 'app-story-popup',
  templateUrl: './story-popup.component.html',
  styleUrls: ['./story-popup.component.scss']
})
export class StoryPopupComponent implements OnInit {

  @Input() childMessage!: test
  @Input() popup!: boolean
  @Input() isCreate!: boolean
  @Output() close = new EventEmitter<boolean>();
  userDetails: UserModel = new UserModel
  story!: test
  
  constructor(private userService: UserService) {}

  ngOnInit() { this.userDetails = this.userService.getUserDetails() }

  closePopup(bool: boolean): void {
    this.close.emit(bool)
  }

}

class test {
  public user: string = String()
  public image: string = String()
  public isActive: boolean = Boolean()
}

export default test