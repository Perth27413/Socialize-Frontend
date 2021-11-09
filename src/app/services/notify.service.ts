import { Injectable } from '@angular/core'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import Swal from 'sweetalert2'

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

  public async sweetSuccess(message: string) {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }

  public async sweetWarning(message: string) {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Warning!',
        text: message,
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }

  public async sweetError(message: string) {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(result => {
        resolve(result.isConfirmed)
      })
    })
  }
}
