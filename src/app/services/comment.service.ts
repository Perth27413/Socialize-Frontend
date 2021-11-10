import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import CommentAddRequestModel from '../models/Comments/CommentAddRequestModel'
import CommentLikedRequestModel from '../models/Comments/CommentLikedRequestModel'
import CommentLikedResponseModel from '../models/Comments/CommentLikedResponseModel'
import CommentPageModel from '../models/Comments/CommentPageModel'
import CommentRequestModel from '../models/Comments/CommentRequestModel'
import PostAddRequestModel from '../models/Posts/PostAddRequestModel'
import UserModel from '../models/User/UserModel'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private path: string = 'http://socialize.ddns.net:3000/api/comment'

  constructor(private http: HttpClient) { }

  public getComment(postId: number) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: CommentRequestModel = {
      userId: userDetails.id,
      postId: postId
    }
    return this.http.post<CommentPageModel>(`${this.path}/`, request)
  }

  public addComment(request: CommentAddRequestModel) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    request.userId = userDetails.id
    return this.http.post<CommentPageModel>(`${this.path}/add`, request)
  }

  public likeComment(commentId: number) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: CommentLikedRequestModel = {
      userId: userDetails.id,
      commentId: commentId
    }
    return this.http.post<CommentLikedResponseModel>(`${this.path}/like`, request)
  }
  
}
