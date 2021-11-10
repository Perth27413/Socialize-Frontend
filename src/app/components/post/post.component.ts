import { Component, OnInit } from '@angular/core';
import CommentAddRequestModel from 'src/app/models/Comments/CommentAddRequestModel';
import CommentLikedResponseModel from 'src/app/models/Comments/CommentLikedResponseModel';
import CommentModel from 'src/app/models/Comments/CommentModel';
import CommentPageModel from 'src/app/models/Comments/CommentPageModel';
import PostLikedResponseModel from 'src/app/models/Posts/PostLikedResponseModel';
import PostModel from 'src/app/models/Posts/PostModel';
import PostPageModel from 'src/app/models/Posts/PostPageModel';
import UserModel from 'src/app/models/User/UserModel';
import { CommentService } from 'src/app/services/comment.service';
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
  comment: CommentAddRequestModel = new CommentAddRequestModel

  constructor(private postService: PostService, private userService: UserService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getPost()
    this.userDetails = this.userService.getUserDetails()
  }

  private getPost(): void {
    this.postService.getPost(1).subscribe((response: PostPageModel) => {
      this.postList = response
      this.postList.posts.forEach((item: PostModel) => {
        item.showComment = false
        item.commentLists = new CommentPageModel
      })
    })
  }

  private getComment(index: number): void {
    const post: PostModel = this.postList.posts[index]
    this.commentService.getComment(post.id).subscribe((response: CommentPageModel) => {
      this.postList.posts[index].commentLists = response
    })
  }

  private addComment(index: number): void {
    this.commentService.addComment(this.comment).subscribe((response: CommentPageModel) => {
      this.postList.posts[index].commentLists = response
      this.comment = new CommentAddRequestModel
    })
  }

  public getPhotoLayoutClassName(pictureLength: number): string {
    return `grid-${pictureLength}`
  }

  public getPhotoClassName(index: number) {
    return `photo-${index + 1}`
  }

  public async toggleShowComment(index: number) {
    this.postList.posts[index].showComment = !this.postList.posts[index].showComment
    if (this.postList.posts[index].showComment) {
      this.getComment(index)
    }
  }

  public onCommentEnter(index: number) {
    const postId: number = this.postList.posts[index].id
    if (this.comment.contents.length > 0) {
      this.comment.postId = postId
      this.addComment(index)
    }
  }

  public likePost(index: number): void {
    this.postService.postLike(this.postList.posts[index].id).subscribe((response: PostLikedResponseModel) => {
      if (response) {
        this.postList.posts[index].liked = response.liked
        this.postList.posts[index].isLiked = response.isLiked
      }
    })
  }

  public likeComment(postIndex: number, commentIndex: number): void {
    const comment: CommentModel = this.postList.posts[postIndex].commentLists.comments[commentIndex]
    this.commentService.likeComment(comment.id).subscribe((response: CommentLikedResponseModel) => {
      if (response) {
        this.postList.posts[postIndex].commentLists.comments[commentIndex].isLiked = response.isLiked
        this.postList.posts[postIndex].commentLists.comments[commentIndex].liked = response.liked
      }
    })
  }
}
