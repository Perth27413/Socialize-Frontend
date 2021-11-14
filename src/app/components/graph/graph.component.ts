import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  socailLogin: { socailName: string, icon: string, quantity: number, percent: number }[] = [
    { socailName: 'facebook', icon: 'fab fa-facebook-f', quantity: 500, percent: 13 },
    { socailName: 'google', icon: 'fab fa-google', quantity: 500, percent: 13 },
    { socailName: 'socailize', icon: 'fab fa-stripe-s', quantity: 500, percent: 13 },
  ]
  basicData: any;
  dataSource: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.dataSource = {
      labels: ['facebook', 'google', 'socailize'],
      datasets: [
        {
          data: [300, 50, 100],
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
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Second Dataset',
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
    };
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
