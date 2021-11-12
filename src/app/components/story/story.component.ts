import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements AfterViewInit {
  @ViewChild('storyBox') public scroll!: ElementRef<HTMLElement>;
  leftScroll: boolean = false
  rightScroll: boolean = true
  scrollSlide: number = 320

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  private showScrollCheck(currentScroll: number): void {
    let maxScroll: number = this.scroll.nativeElement.scrollWidth - this.scroll.nativeElement.clientWidth
    this.leftScroll = currentScroll <= 0 ? false : true
    this.rightScroll = currentScroll >= (maxScroll * 0.9) ? false : true
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

  storyList: { user: string, image: string, isActive: boolean }[] = [
    { user: 'https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.18169-9/26238776_2101967746745773_77371830993486459_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_eui2=AeH3l-9c2khCcVplkoTZRALPRz3rN7NCQ1dHPes3s0JDV23Y5OwE6f43BtUUB-id-Ihf940eWSI3nodWJE9pbYwd&_nc_ohc=ZHoBBEpQjwQAX95XbZg&tn=RFbGWcrFuZvQXM6b&_nc_ht=scontent.fbkk10-1.fna&oh=92024295d165b369568b161f30b618cf&oe=61AE1E02', image: 'https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.18169-9/12219318_1656148921327660_1716789488201421922_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeHByx7bn63Q2hnS_UBYXrcKRUaB9T8AjTJFRoH1PwCNMl28XsuWkkocBBf0iY-czD2IGFP9cWEduOOXqRDSXL51&_nc_ohc=D1hR75muk2IAX_hBTqe&_nc_ht=scontent.fbkk10-1.fna&oh=31794d499f028852d581d7f52e4bf63d&oe=61AF0946', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true },
    { user: '../../../assets/image/profile.jpg', image: '../../../assets/image/profile.jpg', isActive: true }
  ]

}