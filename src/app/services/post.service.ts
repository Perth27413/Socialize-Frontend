import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PostLikedRequestModel from '../models/Posts/PostLikedRequestModel';
import PostLikedResponseModel from '../models/Posts/PostLikedResponseModel';
import PostPageModel from '../models/Posts/PostPageModel';
import PostRequestModel from '../models/Posts/PostRequestModel';
import UserModel from '../models/User/UserModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private path: string = 'http://socialize.ddns.net:3000/api/post'

  constructor(private http: HttpClient) { }

  public getPost(page: number) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: PostRequestModel = {
      page: page,
      userId: userDetails.id
    }
    return this.http.post<PostPageModel>(`${this.path}/`, request)
  }

  public postLike(postId: number) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: PostLikedRequestModel = {
      userId: userDetails.id,
      postId: postId
    }
    return this.http.post<PostLikedResponseModel>(`${this.path}/like`, request)
    // return this.http.post<string>(`${this.path}/like`, request, { responseType: 'text' as 'json'})
  }
  
}
