import { Component, OnInit } from '@angular/core';
import PostLikedResponseModel from 'src/app/models/Posts/PostLikedResponseModel';
import PostModel from 'src/app/models/Posts/PostModel';
import PostPageModel from 'src/app/models/Posts/PostPageModel';
import UserModel from 'src/app/models/User/UserModel';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isShowComment: boolean = false
  postList: PostPageModel = new PostPageModel
  userDetails: UserModel = new UserModel

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.getPost()
    this.userDetails = this.userService.getUserDetails()
  }

  private getPost(): void {
    this.postService.getPost(1).subscribe((response: PostPageModel) => {
      this.postList = response
      this.postList.posts.forEach((item: PostModel) => item.showComment = false)
    })
  }

  public getPhotoLayoutClassName(pictureLength: number): string {
    return `grid-${pictureLength}`
  }

  public getPhotoClassName(index: number) {
    return `photo-${index + 1}`
  }

  public toggleShowComment(index: number) {
    this.postList.posts[index].showComment = !this.postList.posts[index].showComment
  }

  public likePost(index: number): void {
    this.postService.postLike(this.postList.posts[index].id).subscribe((response: PostLikedResponseModel) => {
      if (response) {
        this.postList.posts[index].liked = response.liked
        this.postList.posts[index].isLiked = response.isLiked
      }
    })
  }
}
