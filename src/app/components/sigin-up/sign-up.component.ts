import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  date!: Date
  today: Date = new Date()
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToSignIn(): void {
    this.router.navigateByUrl('/login')
  }
}
