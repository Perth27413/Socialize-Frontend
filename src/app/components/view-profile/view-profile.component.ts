import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  numfile: number = 0
  files: any

  constructor() { }

  ngOnInit(): void {
  }

  public countMutifile(events: Event): void {
    const target = events.target as HTMLInputElement;
    this.files = target.files as FileList;
    this.numfile =  this.files.length;

    for (let i = 0; i <  this.files.length; i++) {    
      let test =  this.files.item(i)?.type
      if(test != 'image/jpeg' && 'image/png' ) {
        console.log('invalid file type must be a jpg or png');  
      } else {
        console.log('The file type is correct.');
      }
    }
  }

  clearPicture(files: any) {
    files = this.numfile = 0
    let clearFiles = document.getElementById('FileInput')?.remove()  
    this.files = clearFiles 
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type != 'image/jpeg' && 'image/png') {
        console.log('invalid file type must be a jpg or png');
        return
      }
      else {
        console.log('The file type is correct.');
      }
    }
  }
}
