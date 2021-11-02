import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showSideBar: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(): void {
    this.showSideBar = !this.showSideBar
  }

}
