import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() showSideBar: boolean = false
  @Output() showSideBarChange: EventEmitter<boolean> = new EventEmitter()
  userDetails!: UserModel

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
  }

  public toggleSidebar(): void {
    this.showSideBarChange.emit(!this.showSideBar)
  }
}
