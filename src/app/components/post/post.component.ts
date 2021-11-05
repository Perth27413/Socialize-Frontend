import { Component, OnInit } from '@angular/core';
// import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isShowComment: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowComment() {
    this.isShowComment = !this.isShowComment;
  }
}
