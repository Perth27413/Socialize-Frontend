import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.scss']
})
export class SiginUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToSignIn(): void {
    this.router.navigateByUrl('/login')
  }
}
