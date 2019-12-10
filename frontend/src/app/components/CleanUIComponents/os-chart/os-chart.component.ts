import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-os-chart',
  templateUrl: './os-chart.component.html',
  styleUrls: ['./os-chart.component.scss']
})
export class OsChartComponent implements OnInit {

  constructor() { }
  title = 'Statisitcs';
  // constructor() { }
  chart ;
  private randomColor: Function;
  Colors : any;
  color: any;
  ngOnInit() {

    this.chart = new Chart('canvas', {

      type: 'pie',
      data: {
          labels: ['osama', 'renil', 'wael', 'sherif', 'hemaya', 'ahmed' ],
          datasets: [{
              // label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ] ,
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
				legend: {
          position: 'top',
          display: false
        },
        animation: {
					animateScale: true,
					animateRotate: true
				}
      }
    })



  } ;
  
  getRandomColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
      
  }

  }


