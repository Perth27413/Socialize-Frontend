import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slideshow-images',
  templateUrl: './slideshow-images.component.html',
  styleUrls: ['./slideshow-images.component.scss']
})
export class SlideshowImagesComponent implements OnInit {

  @Input() imageList: Array<string> = [];
  
  @Output() isShowImagesChange = new EventEmitter<boolean>()
  @Input() isShowImages!: boolean

  images: {link: string}[] = []

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 4
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '380px',
          numVisible: 1
      }
  ];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.imageList.length; index++) {
      this.images.push({link: this.imageList[index]})
    }
  }

  closeShowImage(show: boolean):void {
    this.isShowImagesChange.emit(show)
  }

}
