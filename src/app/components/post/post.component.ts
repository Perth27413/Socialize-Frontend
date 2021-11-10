import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @HostListener('window:scroll', ['$event'])
  @Input() public homeRef!: ElementRef
  
  isBottom: boolean = false
  isShowComment: boolean = false
  postList: PostPageModel = new PostPageModel
  userDetails: UserModel = new UserModel
  comment: CommentAddRequestModel = new CommentAddRequestModel
  currentPage: number = 1
  isPostLoading: boolean = false

  constructor(private postService: PostService, private userService: UserService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.isPostLoading = true
    setTimeout(() => {
      this.isPostLoading = false
      this.getPost(1)
    }, 2000)
    this.userDetails = this.userService.getUserDetails()
  }
  
  ngAfterViewChecked() {
    this.onScroll()
  }

  private onScroll(): void {
    try {
      let currentScroll: number = this.homeRef.nativeElement.scrollTop + this.homeRef.nativeElement.offsetHeight
      let maxScroll: number = this.homeRef.nativeElement.scrollHeight
      if (currentScroll >= (maxScroll * 0.6) && !this.isBottom && (this.currentPage !== this.postList.totalPage)) {
        this.isBottom = true
        this.isPostLoading = true
        setTimeout(() => {
          this.isPostLoading = false
          this.getPost(this.currentPage + 1)
        }, 2000)
      }
    } catch (error) {
    }
  }

  private getPost(page: number): void {
    this.postService.getPost(page).subscribe((response: PostPageModel) => {
      this.postList = this.mapPostListFromResonse(response)
      this.currentPage = response.currentPage
      this.postList.posts.forEach((item: PostModel) => {
        item.showComment = false
        item.commentLists = new CommentPageModel
      })
    })
  }

  private mapPostListFromResonse(response: PostPageModel): PostPageModel {
    let newPosts: PostPageModel = response
    let currentPosts: PostPageModel = this.postList
    newPosts.posts = currentPosts.posts.concat(newPosts.posts)
    return newPosts
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
