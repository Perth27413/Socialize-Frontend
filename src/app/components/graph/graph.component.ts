import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from 'src/app/models/User/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  socailLogin: { socailName: string, icon: string, quantity: number, percent: number }[] = [
    { socailName: 'facebook', icon: 'fab fa-facebook-f', quantity: 103, percent: 25.69 },
    { socailName: 'google', icon: 'fab fa-google', quantity: 98, percent: 24.44 },
    { socailName: 'socailize', icon: 'fab fa-stripe-s', quantity: 200, percent: 49.88 },
  ]
  basicData: any;
  dataSource: any;
  options: any;
  private userDetails: UserModel = new UserModel
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails()
    this.checkIsNotAdmin()
    this.dataSource = {
      labels: ['facebook', 'google', 'socailize'],
      datasets: [
        {
          data: [this.socailLogin[0].quantity, this.socailLogin[1].quantity, this.socailLogin[2].quantity],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Posts',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Story',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    }
  }

  private checkIsNotAdmin(): void {
    if (this.userDetails.roleId === 1) {
      this.route.navigateByUrl('/')
    }
  }

  colorSocailContainer(index: number) {
    return {
      'facebook': this.socailLogin[index].socailName == 'facebook',
      'google': this.socailLogin[index].socailName == 'google',
      'socailize': this.socailLogin[index].socailName == 'socailize',
      'facebook-logo': this.socailLogin[index].socailName == 'facebook',
      'google-logo': this.socailLogin[index].socailName == 'google',
      'socailize-logo': this.socailLogin[index].socailName == 'socailize',
    }
  }

}
