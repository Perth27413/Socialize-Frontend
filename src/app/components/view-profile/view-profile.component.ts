import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() public profileRef!: ElementRef
  @ViewChild('fileUpload') fileInputRef!: ElementRef
  files: Array<File> = []
  isCurrent: boolean = false

  constructor(private notifyService: NotifyService, private userService: UserService) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit() {

  }

  public async countMutifile(events: Event): Promise<void> {
    const target = events.target as HTMLInputElement
    const fileLists: FileList = target.files as FileList
    const totalFiles: number = this.files.length + fileLists.length
    if (totalFiles <= 4) {
      for (let i = 0; i < fileLists.length; i++) {    
        let type =  fileLists.item(i)?.type
        if(type != 'image/jpeg' && 'image/png' ) {
          await this.notifyService.sweetWarning('Invalid file type Please check the JPG or PNG file extension.')
        } else {
          this.files.push(fileLists[i])
        }
      }
    } else {
      await this.notifyService.sweetWarning('Upload limit of 4 images.')
    }
    this.fileInputRef.nativeElement.value = ''
  }

  public clearPicture(): void {
    this.files = []
  }
}
