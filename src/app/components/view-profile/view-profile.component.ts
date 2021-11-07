import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  numfile: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  public countMutifile(events: Event): void {
    const target = events.target as HTMLInputElement;
    const files = target.files as FileList;
    this.numfile = files.length;
    console.log(target.files);
    // for (var arr in target.files) {
    //   console.log(arr);
    // }
    // if (files) {
    //   if (files.type != 'image/jpeg' && 'image/png') {
    //     console.log('invalid file type must be a jpg or png');
    //     return
    //   }
    //   else {
    //     console.log('The file type is correct.');
    //   }
    // }
  }
  // uploadFile(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     if (file.type != 'image/jpeg' && 'image/png') {
  //       console.log('invalid file type must be a jpg or png');
  //       return
  //     }
  //     else {
  //       console.log('The file type is correct.');
  //     }
  //   }
  // }
}
