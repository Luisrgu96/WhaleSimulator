import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphDataService } from '../graph-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private serviciograph: GraphDataService) { }

  ngOnInit(): void {
    const arrayData =  this.serviciograph.sendGraphData.subscribe(data => {
           

      console.log("recibiendo data", data)

      this.lineChartData.datasets[0].data = data;

      this.labels = []
      for (let i = 0; i < data.length; i++) {
        this.labels.push(i.toString())
      }
      this.lineChartData.labels = this.labels
      
  
      this.chart?.update();
      this.showChart = true;

      
      
    })
    

  }
 
  public dataArr:Array<number> = [];
  public labels:Array<string> = [];
  public showChart: Boolean = false;
  
  // dataArr = this.populationArr;

  
  public lineChartData: ChartConfiguration['data'] = {    
    
    datasets: [
      {
        data: this.dataArr,
        label: 'Series A',                
        borderColor: 'rgb(91, 26, 41)',
        backgroundColor: 'rgba(91, 26, 41, 0.3)',
        pointBackgroundColor: 'rgb(91, 26, 41)',
        pointBorderColor: 'rgb(91, 26, 41)',
        pointHoverBackgroundColor:'rgb(91, 26, 41)',
        pointHoverBorderColor: 'rgb(91, 26, 41)',
        fill: 'origin',
      }      
    ],
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgb(91, 26, 41)',
        },
        ticks: {
          color: 'rgb(91, 26, 41)'
        }
      }
    },

    plugins: {
      legend: { display: true },
      
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = ChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = ChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = 'rgb(91, 26, 41)';

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
    }

    this.chart?.update();
  }



}
