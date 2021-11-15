import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {

  cardProfile: Array<any> = [
    {name: 'Jessica Black', Follower: '15', Following: '11', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Elbert Sherman', Follower: '12', Following: '15', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Gretchen Ryan', Follower: '13', Following: '16', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Rickey Paul', Follower: '10', Following: '9', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Jennifer Poole', Follower: '19', Following: '9', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'April Kelley', Follower: '1', Following: '7', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Tonya Richards', Follower: '12', Following: '5', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Debra Jennings', Follower: '0', Following: '1', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
    {name: 'Lela Reese', Follower: '0', Following: '2', pathUrl: 'https://sv1.picz.in.th/images/2021/11/14/uFnmU1.jpg'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
