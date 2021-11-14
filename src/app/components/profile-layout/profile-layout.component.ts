import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
  public isEdit: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.checkPathIsEdit()
  }

  private checkPathIsEdit(): void {
    const path: Array<string> = window.location.pathname.split('/')
    if (path[path.length - 1] === 'edit') {
      this.isEdit = true
    }
  }


}
