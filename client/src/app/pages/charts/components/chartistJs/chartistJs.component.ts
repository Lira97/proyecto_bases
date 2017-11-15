import {Component} from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {ChartistJsService} from './chartistJs.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VentasTablesService } from '../../../tables/components/ventasTables/ventasTables.service';
import { GLOBAL } from '../../../../services/global'
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
  providers: [UserService]
})

export class ChartistJs {
  public Fechas = [
    {inicio: '2017-01-01 0:0:0', fin: '2017-01-31 23:59:59'},
    {inicio: '2017-02-01 0:0:0', fin: '2017-02-28 23:59:59'},
    {inicio: '2017-03-01 0:0:0', fin: '2017-03-31 23:59:59'},
    {inicio: '2017-04-01 0:0:0', fin: '2017-04-30 23:59:59'},
    {inicio: '2017-05-01 0:0:0', fin: '2017-05-30 23:59:59'},
    {inicio: '2017-06-01 0:0:0', fin: '2017-06-30 23:59:59'},
    {inicio: '2017-07-01 0:0:0', fin: '2017-07-31 23:59:59'},
    {inicio: '2017-08-01 0:0:0', fin: '2017-08-31 23:59:59'},
    {inicio: '2017-09-01 0:0:0', fin: '2017-09-30 23:59:59'},
    {inicio: '2017-10-01 0:0:0', fin: '2017-10-31 23:59:59'},
    {inicio: '2017-11-01 0:0:0', fin: '2017-11-30 23:59:59'},
    {inicio: '2017-12-01 0:0:0', fin: '2017-12-31 23:59:59'},
  ];
  public STATISTICS = [
    {letter: "Jan", frequency: 0},
    {letter: "Feb", frequency: 0},
    {letter: "Mar", frequency: 0},
    {letter: "Apr", frequency: 0},
    {letter: "May", frequency: 0},
    {letter: "Jun", frequency: 0},
    {letter: "Jul", frequency: 0},
    {letter: "Aug", frequency: 0},
    {letter: "Sep", frequency: 0},
    {letter: "Oct", frequency: 0},
    {letter: "Nov", frequency: 0},
    {letter: "Dec", frequency: 0},
  ];

  title = 'Ventas por mes';

  public url: string;
  public token;
  public numero;
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(private _chartistJsService:ChartistJsService,protected service: VentasTablesService,private _route: ActivatedRoute,
  private _router: Router,private _userService: UserService) {
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.getFecha();
    console.log(this.STATISTICS)

  }

  ngOnInit() {
  }

  private initSvg() {
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
                     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.STATISTICS.map((d) => d.letter));
    this.y.domain([0, d3Array.max(this.STATISTICS, (d) => d.frequency)]);
  }

  private drawAxis() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");
  }

  private drawBars() {
    this.g.selectAll(".bar")
          .data(this.STATISTICS)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => this.x(d.letter) )
          .attr("y", (d) => this.y(d.frequency) )
          .attr("width", this.x.bandwidth())
          .attr("height", (d) => this.height - this.y(d.frequency) );
  }

  public getFecha(){
    for(let i = 0; i <= 11; ++i) {
      this.service.getFecha(this.token,this.Fechas[i].inicio,this.Fechas[i].fin).subscribe(
                    data  =>  {
                        if(!data) {
                            this._router.navigate(['/datatables']);
                        }else {
                          this.STATISTICS[i].frequency = data.venta;
                          console.log(this.STATISTICS[i].frequency)
                          if (i == 11){
                          this.initSvg();
                          this.initAxis();
                          this.drawAxis();
                          this.drawBars();
                        }
                        }

                    },
                    error => {
                        var errorMessage = <any>error;
                        if(errorMessage != null) {
                            var body = JSON.parse(error._body);
                            console.log(errorMessage);
                        }
                    }
        );
    }
  }
}
