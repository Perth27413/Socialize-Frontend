import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { UserService } from 'src/app/services/user.service';
import StoryModel from 'src/app/models/Story/StoryModel';
import UserModel from 'src/app/models/User/UserModel';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  @ViewChild('storyBox') public scroll!: ElementRef<HTMLElement>;
  public storyList!: Array<StoryModel>
  public leftScroll: boolean = false
  public rightScroll: boolean = true
  public scrollSlide: number = 320
  public popupShow: boolean = false
  public createStory: boolean = false
  public story!: StoryModel
  public user!: UserModel
  public maxScroll!: number


  constructor(private storyService: StoryService, private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUserDetails()
    this.storyService.getAllStory().subscribe(
      data => {
        this.storyList = data
      }
    )
  }

  ngAfterViewChecked() {
    this.maxScroll = this.scroll.nativeElement.scrollWidth - this.scroll.nativeElement.clientWidth
  }

  public createPopup() {
    this.createStory = !this.createStory
    this.popupShow = !this.popupShow
  }

  public closePopup(bool: boolean) {
    this.popupShow = bool
    this.createStory = false
  }

  public showPopup(list: StoryModel) {
    this.popupShow = !this.popupShow
    this.story = list

  }

  private showScrollCheck(currentScroll: number): void {
    this.leftScroll = currentScroll <= 0 ? false : true
    this.rightScroll = currentScroll >= (this.maxScroll * 0.9) ? false : true
  }

  public async leftArrow() {
    let currentScroll: number = this.scroll.nativeElement.scrollLeft - this.scrollSlide
    this.scroll.nativeElement.scrollLeft = this.scroll.nativeElement.scrollLeft - this.scrollSlide
    this.showScrollCheck(currentScroll)
  }

  public async rightArrow() {
    let currentScroll = this.scroll.nativeElement.scrollLeft + this.scrollSlide
    this.scroll.nativeElement.scrollLeft = this.scroll.nativeElement.scrollLeft + this.scrollSlide
    this.showScrollCheck(currentScroll)
  }

}