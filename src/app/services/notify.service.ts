import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  public success(message: string): void {
    Notify.success(message, {
      timeout: 1500
    })
  }

  public error(message: string): void {
    Notify.failure(message, {
      timeout: 3000
    })
  }

  public warning(message: string): void {
    Notify.warning(message, {
      timeout: 3000
    })
  }
}
