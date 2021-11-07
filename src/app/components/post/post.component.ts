import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isShowComment: boolean = false;
  test: string = "แมว"
  postList: { name: string, decs: string, imageProfile: string, showComment: boolean, textContent: string, photoContent: { photo: string }[] }[] = [
    { 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ],
      showComment: false
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ],
      showComment: false
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ],
      showComment: false
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ],
      showComment: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public getPhotoLayoutClassName(pictureLength: number): string {
    return `grid-${pictureLength}`
  }

  public getPhotoClassName(index: number) {
    return `photo-${index + 1}`
  }

  toggleShowComment(index: number) {
    this.postList[index].showComment = !this.postList[index].showComment
  }
}
