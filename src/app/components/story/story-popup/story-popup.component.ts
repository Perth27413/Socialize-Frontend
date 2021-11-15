import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { StoryService } from 'src/app/services/story.service';
import { PostService } from 'src/app/services/post.service';
import { ImageModel } from 'src/app/models/Image/ImageModel';
import StoryModel from 'src/app/models/Story/StoryModel';
import UserModel from 'src/app/models/User/UserModel';
import StoryRequestModel from 'src/app/models/Story/StoryRequestModel'

@Component({
  selector: 'app-story-popup',
  templateUrl: './story-popup.component.html',
  styleUrls: ['./story-popup.component.scss']
})
export class StoryPopupComponent implements OnInit {

  @Input() story!: StoryModel
  @Input() popup!: boolean
  @Input() isCreate!: boolean
  @Output() close = new EventEmitter<boolean>();
  @Input() user!: UserModel
  public storyImage!: Array<File>
  public convertImg!: string
  public request: StoryRequestModel = new StoryRequestModel
  public selectImage: boolean = false

  constructor(private notifyService: NotifyService, private storyService: StoryService, private postService: PostService) { }

  ngOnInit() { }


  public closePopup(bool: boolean): void {
    this.cleanData()
    this.selectImage = false
    this.close.emit(bool)
  }

  public cleanData() {
    this.storyImage = []
    this.convertImg = ''
    this.request = new StoryRequestModel
  }

  public checkUser(bool: boolean) {
    let userName!: string
    if (bool)
      userName = this.user.userName
    else
      userName = this.story.owner.userName
    return userName
  }

  public checkUserImage(bool: boolean) {
    let userPic!: string
    if (bool)
      userPic = this.user.profilePicture
    else
      userPic = this.story.owner.profilePicture
    return userPic
  }

  public async checkImage(events: Event): Promise<void> {
    const target = events.target as HTMLInputElement
    const file: FileList = target.files as FileList
    let type: string = file[0].type
    if (type !== 'image/jpeg' && type !== 'image/png') {
      await this.notifyService.sweetWarning('Invalid file type Please check the JPG or PNG file extension.')
    }
    this.storyImage = []
    this.storyImage.push(file[0])
    this.convertImageToBase64()
  }

  public convertImageToBase64() {
    let img = this
    let file = this.storyImage
    let reader = new FileReader()
    reader.readAsDataURL(file[0])
    console.log(reader.result as string)
    reader.onload = function () {
      img.selectImage = true
      img.convertImg = reader.result as string
      img.postImage(img.convertImg)
    };
    reader.onerror = function () {
      img.notifyService.sweetError('Error to convert image to base64')
    };
  }

  public postImage(imgBase64: string) {
    this.postService.postImageApi(imgBase64).subscribe((img: ImageModel) => {
      this.convertImg = img.data.url
    })
  }

  public createStory() {
    let img = this
    img.request = {
      contents: img.request.contents,
      picture: img.convertImg,
      ownerId: img.user.id
    }
    let req: StoryRequestModel = img.request
    img.storyService.createStory(req).subscribe(() => {
      setTimeout(() => {
        img.cleanData()
        img.notifyService.sweetSuccess('Create Story Sompletely')
      }, 2000)
      window.location.reload()
    }, function (error) {
      img.notifyService.sweetError(error.message)
    })
  }
}