import { Component, OnInit } from '@angular/core';
import PostPageModel from 'src/app/models/Posts/PostPageModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isShowComment: boolean = false
  postList: PostPageModel = new PostPageModel

  constructor() { }

  ngOnInit(): void {
  }

  public getPhotoLayoutClassName(pictureLength: number): string {
    return `grid-${pictureLength}`
  }

  public getPhotoClassName(index: number) {
    return `photo-${index + 1}`
  }

  public toggleShowComment(index: number) {
    // this.postList[index].showComment = !this.postList[index].showComment
  }
}
