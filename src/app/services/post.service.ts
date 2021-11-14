import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageModel } from '../models/Image/ImageModel';
import PostAddRequestModel from '../models/Posts/PostAddRequestModel';
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

  public getPost(page: number, userId: number, isCurrent: boolean) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: PostRequestModel = {
      currentUserId: userDetails.id,
      page: page,
      userId: userId,
      isCurrent: isCurrent
    }
    return this.http.post<PostPageModel>(`${this.path}/`, request)
  }

  public addPost(request: PostAddRequestModel) {
    return this.http.post<string>(`${this.path}/add`, request, {responseType: 'text' as 'json'})
  }

  public postLike(postId: number) {
    const userDetails: UserModel = JSON.parse(window.localStorage.getItem('user')!)
    const request: PostLikedRequestModel = {
      userId: userDetails.id,
      postId: postId
    }
    return this.http.post<PostLikedResponseModel>(`${this.path}/like`, request)
  }

  public postImageApi(imageBase64: string) {
    const path: string = 'https://api.imgbb.com/1/upload?expiration=604800&key=27a07cc9c38cccf83c919bb18bda4fb7'
    const formData: FormData = new FormData
    formData.append('image', imageBase64)
    return this.http.post<ImageModel>(path, formData)
  }

  public deletePost(postId: number) {
    return this.http.post<string>(`${this.path}/delete?postId=${postId}`, '', {responseType: 'text' as 'json'})
  }
  
}
