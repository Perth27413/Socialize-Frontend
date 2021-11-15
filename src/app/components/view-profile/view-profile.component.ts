import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public files: Array<File> = []
  public isCurrent: boolean = false
  public userDetails: UserModel = new UserModel
  public addPostRequest: PostAddRequestModel = new PostAddRequestModel
  public imageBase64List: Array<string> = []
  public isLoading: boolean = false
  public isOwner: boolean = false
  public paramId: number = 0

  constructor(private notifyService: NotifyService, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setParamUserId()
    this.userDetails = this.userService.getUserDetails()
    this.checkIsOwner()
  }
  
  ngAfterViewInit() {

  }
  
  private setParamUserId(): void {
    this.route.params.subscribe(params => {
      this.paramId = Number(params.id)
    })
  }

  private checkIsOwner(): void {
    if (this.paramId === this.userDetails.id) {
      this.isOwner = true
    }
  }

  public addPost(): void {
    this.postService.addPost(this.addPostRequest).subscribe((item: string) => {
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
            setTimeout(() => {
              this.addPost()
            }, 2000)
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
