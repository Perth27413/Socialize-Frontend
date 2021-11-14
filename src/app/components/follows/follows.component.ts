import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {

  cardProfile: Array<any> = [
    {name: 'Slim Nor1', Follower: '15', Following: '11'},
    {name: 'Slim Nor2', Follower: '12', Following: '15'},
    {name: 'Slim Nor3', Follower: '13', Following: '16'},
    {name: 'Slim Nor4', Follower: '10', Following: '9'},
    {name: 'Slim Nor5', Follower: '19', Following: '9'},
    {name: 'Slim Nor6', Follower: '1', Following: '7'},
    {name: 'Slim Nor7', Follower: '12', Following: '5'},
    {name: 'Slim Nor8', Follower: '0', Following: '1'},
    {name: 'Slim Nor9', Follower: '0', Following: '2'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
