import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import SearchModel from 'src/app/models/Search/SearchModel';
import SearchQuery from 'src/app/models/Search/SearchQuery';
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
  result: Array<SearchModel> = []
  searchData: Array<SearchModel> = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
    this.getAllUser()
  }

  private getAllUser(): void {
    this.userService.getAllUser().subscribe((item: Array<UserModel>) => {
      this.mapUserModelToSearchData(item)
    })
  }

  private mapUserModelToSearchData(user: Array<UserModel>): void {
    user.forEach((item: UserModel) => {
      let data: SearchModel = {
        id: item.id,
        name: `${item.firstName} ${item.lastName}`
      }
      this.searchData.push(data)
    })
  }

  public toggleSidebar(): void {
    this.showSideBarChange.emit(!this.showSideBar)
  }

  public onlogoClick(): void {
    window.location.href = '/'
  }

  public search({query = ''}): void {
    setTimeout(() => {
      if (query === "") {
        this.result = [...this.searchData];
      } else {
        this.result = this.searchData.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
      }
    }, 500)
  }

  public onSelect(value: SearchModel): void {
    window.location.href = '/profile/' + value.id
  }
}
