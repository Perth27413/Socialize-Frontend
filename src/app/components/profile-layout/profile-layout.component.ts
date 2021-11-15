import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
  @ViewChild('profileLayout') public profileRef!: ElementRef
  public isEdit: boolean = false
  public isBottom: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.checkPathIsEdit()
  }

  private checkPathIsEdit(): void {
    const path: Array<string> = window.location.pathname.split('/')
    if (path[path.length - 1] === 'edit') {
      this.isEdit = true
    }
    console.log(this.isEdit)
  }

  onScroll(event: Event) {
    try {
      let currentScroll: number = this.profileRef.nativeElement.scrollTop + this.profileRef.nativeElement.offsetHeight
      let maxScroll: number = this.profileRef.nativeElement.scrollHeight
      if (currentScroll >= (maxScroll * 0.9) && !this.isBottom) {
        this.isBottom = true
      }
    } catch (error) {}
  }

}
