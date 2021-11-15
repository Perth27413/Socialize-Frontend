import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import ProfileModel from '../models/Profile/ProfileModel';
import LoginRequestModel from '../models/User/LoginRequestModel';
import RegisterRequestModel from '../models/User/RegisterRequestModel';
import EditRequestModel from '../models/User/EditProfileRequestModel';
import UserModel from '../models/User/UserModel';
import FollowRequestModel from '../models/Follow/FollowRequestModel';
import PopularResponseModel from '../models/Follow/PopularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path: string = 'http://socialize.ddns.net:3000/api/user'

  constructor(private cookie: CookieService, private http: HttpClient) { }

  public setLogin(userDetails: UserModel): void {
    this.cookie.set('isLogin', 'true')
    window.localStorage.setItem('user', JSON.stringify(userDetails))
  }

  public setLogout(): void {
    this.cookie.delete('isLogin')
    window.localStorage.removeItem('user')
  }

  public getLogin(): boolean {
    return this.cookie.get('isLogin') === 'true'
  }

  public getUserDetails(): UserModel {
    return JSON.parse(window.localStorage.getItem('user')!)
  }

  public login(request: LoginRequestModel) {
    return this.http.post<UserModel>(`${this.path}/login`, request)
  }

  public register(request: RegisterRequestModel) {
    return this.http.post<UserModel>(`${this.path}/register`, request)
  }

  public editProfile(request: EditRequestModel) {
    return this.http.post<UserModel>(`${this.path}/update`, request)
  }
  
  public getProfileById(userId: number) {
    const userDetails: UserModel = this.getUserDetails()
    return this.http.get<ProfileModel>(`${this.path}/profile?userId=${userId}&currentUserId=${userDetails.id}`)
  }

  public follow(followingId: number) {
    const userDetails: UserModel = this.getUserDetails()
    const request: FollowRequestModel = {
      following: followingId,
      followed: userDetails.id
    }
    return this.http.post<ProfileModel>(`${this.path}/follow`, request)
  }

  public getPopularPeopleById(userId: number) {
    return this.http.get<Array<PopularResponseModel>>(`${this.path}/popular?userId=${userId}`)
  }

  public getfollowById() {
    const userDetails: UserModel = this.getUserDetails()
    return this.http.post<Array<ProfileModel>>(`${this.path}/following?userId=${userDetails.id}`, '')
  }
}
