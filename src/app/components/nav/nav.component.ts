import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() showSideBar: boolean = false
  @Output() showSideBarChange: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebar(): void {
    this.showSideBarChange.emit(!this.showSideBar)
  }
}
