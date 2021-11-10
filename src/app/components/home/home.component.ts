import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('home') public homeRef!: ElementRef

  isBottom: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onScroll(event: Event) {
    try {
      let currentScroll: number = this.homeRef.nativeElement.scrollTop + this.homeRef.nativeElement.offsetHeight
      let maxScroll: number = this.homeRef.nativeElement.scrollHeight
      if (currentScroll >= (maxScroll * 0.9) && !this.isBottom) {
        this.isBottom = true
      }
    } catch (err) {}
  }

}
