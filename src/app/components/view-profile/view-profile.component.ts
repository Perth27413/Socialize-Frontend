import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageModel } from 'src/app/models/Image/ImageModel';
import PostAddRequestModel from 'src/app/models/Posts/PostAddRequestModel';
import UserModel from 'src/app/models/User/UserModel';
import { NotifyService } from 'src/app/services/notify.service';
import { PostService } from 'src/app/services/post.service';
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
  userDetails: UserModel = new UserModel
  addPostRequest: PostAddRequestModel = new PostAddRequestModel
  imageBase64List: Array<string> = []
  isLoading: boolean = false

  constructor(private notifyService: NotifyService, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
  }
  
  ngAfterViewInit() {

  }

  public addPost(): void {
    this.postService.addPost(this.addPostRequest).subscribe((item: string) => {
      console.log(item)
      setTimeout(() => {
        this.isLoading = false
        window.location.reload()
      }, 1000)
    })
  }

  public async onAddPostClick(): Promise<void> {
    if (this.addPostRequest.contents || this.imageBase64List) {
      this.isLoading = true
      this.addPostRequest.userId = this.userDetails.id
      this.addPostRequest.contents = this.addPostRequest.contents.split(/\r?\n/).join('\n')
      this.postImageApi()
    }
  }

  public postImageApi(): void {
    if (this.imageBase64List.length) {
      for (const [index, item] of this.imageBase64List.entries()) {
        this.postService.postImageApi(item).subscribe((item: ImageModel) => {
          this.addPostRequest.picture.push(item.data.url)
          if (index === (this.imageBase64List.length - 1)) {
            this.addPost()
          }
        })
      }
    } else [
      this.addPost()
    ]
  }

  public async countMutifile(events: Event): Promise<void> {
    const target = events.target as HTMLInputElement
    const fileLists: FileList = target.files as FileList
    const totalFiles: number = this.files.length + fileLists.length
    if (totalFiles <= 4) {
      for (let i = 0; i < fileLists.length; i++) {    
        let type: string =  fileLists.item(i)?.type!
        console.log(type)
        if(type !== 'image/jpeg' && type !== 'image/png' ) {
          await this.notifyService.sweetWarning('Invalid file type Please check the JPG or PNG file extension.')
        } else {
          this.imageToBase64(fileLists[i], type.split('/')[1])
          this.files.push(fileLists[i])
        }
      }
    } else {
      await this.notifyService.sweetWarning('Upload limit of 4 images.')
    }
    this.fileInputRef.nativeElement.value = ''
  }

  private imageToBase64(image: File, type: string) {
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (event => {
      this.imageBase64List.push(String(event.target?.result).replace(`data:image/${type};base64,`, ''))
    })
  }

  public clearPicture(): void {
    this.files = []
    this.imageBase64List = []
    this.addPostRequest.picture = []
  }
}
