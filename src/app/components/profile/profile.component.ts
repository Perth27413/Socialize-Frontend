import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from 'src/app/models/Image/ImageModel';
import ProfileModel from 'src/app/models/Profile/ProfileModel';
import UserModel from 'src/app/models/User/UserModel';
import { NotifyService } from 'src/app/services/notify.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() isEdit: boolean = false
  userProfile: string = 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  userDetails!: UserModel
  profileDetails!: ProfileModel
  isOwner: boolean = false
  paramId: number = 0
  imageBase64: string = ''
  isLoading: boolean = false

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private notifyService: NotifyService, private postService: PostService) { }

  ngOnInit(): void {
    this.setParamUserId()
    this.userDetails = this.userService.getUserDetails()
    this.getProfileDetails()
    this.checkIsOwner()
  }

  public onFollowClick(): void {
    this.userService.follow(this.paramId).subscribe((item: ProfileModel) => {
      this.profileDetails = item
    })
  }

  private setParamUserId(): void {
    this.route.params.subscribe(params => {
      this.paramId = Number(params.id)
    })
  }

  private checkIsOwner(): void {
    this.route.params.subscribe(params => {
      this.isOwner = params.id === this.userDetails.id.toString()
    })
  }

  private getProfileDetails(): void {
    this.userService.getProfileById(this.paramId).subscribe((item: ProfileModel) => {
      this.profileDetails = item
    })
  }

  public async onImageSelect(events: Event): Promise<void> {
    this.isLoading = true
    const target = events.target as HTMLInputElement
    const file: File = target.files?.item(0)!
    const type: string = file.type
    if(type !== 'image/jpeg' && type !== 'image/png' ) {
      await this.notifyService.sweetWarning('Invalid file type Please check the JPG or PNG file extension.')
    } else {
      this.imageToBase64(file, type.split('/')[1])
    }
  }

  private imageToBase64(image: File, type: string): void {
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (event => {
      this.imageBase64 = String(event.target?.result).replace(`data:image/${type};base64,`, '')
      this.postImageApi()
    })
  }

  private postImageApi(): void {
    this.postService.postImageApi(this.imageBase64).subscribe((item: ImageModel) => {
      this.userDetails = this.userService.getUserDetails()
      this.userDetails.profilePicture = item.data.url
      this.updateProfileApi()
    })
  }

  private updateProfileApi(): void {
    this.userService.updateProfilePicture(this.userDetails).subscribe((item: UserModel) => {
      this.userService.setLogin(item)
      this.isLoading = false
      window.location.reload()
    })
  }

  public goToEditPage(): void {
    window.location.href = `/profile/${this.userDetails.id}/edit`
  }

}
