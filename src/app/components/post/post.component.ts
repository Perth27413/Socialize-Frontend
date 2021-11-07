import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isShowComment: boolean = false;
  test: string = "แมว"
  postList: { name: string, decs: string, imageProfile: string, textContent: string, numOfPhoto: number, photoContent: { photo: string }[] }[] = [
    { 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      numOfPhoto: 2,
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ]
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      numOfPhoto: 1,
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
      ]
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      numOfPhoto: 4,
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
      ]
    },{ 
      name: "Meaw Mouw",
      decs: "UX/UI Designer",
      imageProfile: "https://thumbs.dreamstime.com/b/funny-crazy-cat-evil-white-open-mouth-61209625.jpg",
      textContent: "วันนี้อากาศแจ่มแจ่มแจ่มแจ่มแจ่มแจ่มแจ่ม",
      numOfPhoto: 3,
      photoContent: [
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"},
        {photo: "https://www.brandbuffet.in.th/wp-content/uploads/2018/04/1-1.jpg"}
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  gridPhotoLayout(index: number) {
    return {
      'grid1' : this.postList[index].photoContent.length === 1,
      'grid2' : this.postList[index].photoContent.length === 2,
      'grid3' : this.postList[index].photoContent.length === 3,
      'photo1' : this.postList[index].photoContent.length === 1,
      'photo2' : this.postList[index].photoContent.length === 2,
      'photo3' : this.postList[index].photoContent.length === 3,
      'photo-grid3' : this.postList[index].photoContent.length === 3
    }
  }

  toggleShowComment() {
    this.isShowComment = !this.isShowComment;
  }
}
