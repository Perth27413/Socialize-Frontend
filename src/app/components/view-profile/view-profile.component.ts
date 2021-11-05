import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  numfile: number = 10

  constructor() { }

  ngOnInit(): void {
  }

  // public countMutifile(): void {
  //   this.numfile = $("#FileInput")[0].numfile;
  // }
}
