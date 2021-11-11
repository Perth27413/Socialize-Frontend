import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss'],
})
export class PopularPeopleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  popular: { icon: string, name: string, position: string }[] = [
    {
      icon: 'https://images.unsplash.com/photo-1635462048348-ff5f320cb0cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
      name: 'Praew Aphinya',
      position: 'Quality Assurance Engineer'
    },
    {
      icon: 'https://images.unsplash.com/photo-1635462048348-ff5f320cb0cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
      name: 'Pindy Pindy',
      position: 'Quality Assurance Engineer'
    },
    {
      icon: 'https://images.unsplash.com/photo-1635462048348-ff5f320cb0cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
      name: 'Moo Moo',
      position: 'Quality Assurance Engineer'
    },
    {
      icon: 'https://images.unsplash.com/photo-1635462048348-ff5f320cb0cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
      name: 'Pudding',
      position: 'Quality Assurance Engineer'
    },
  ];
}
