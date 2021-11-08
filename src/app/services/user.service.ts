import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import LoginRequestModel from '../models/User/LoginRequestModel';
import UserModel from '../models/User/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path: string = 'http://localhost:3000/api/user'

  constructor(private cookie: CookieService, private http: HttpClient) { }

  public hello(): void {
    this.cookie.set('test', 'test')
  }

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

  public login(request: LoginRequestModel) {
    return this.http.post<UserModel>(`${this.path}/login`, request)
  }
}
