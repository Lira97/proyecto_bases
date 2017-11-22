import {Component} from '@angular/core';
import { VentasTablesService } from '../../tables/components/ventasTables/ventasTables.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Venta } from '../../../models/ventas';

import {PieChartService} from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss'],
  providers: [UserService, VentasTablesService]
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: Array<Object>;
  private _init = false;
  public venta: Venta[];
  public identity=this._userService.getIdentity();
  public token=this._userService.getToken();
  public url: string;
  public data = [{
    color:"rgba(255,255,255,80)",
    description: 'Ventas',
    stats: '57',
    icon: 'person',
  }, {
    color:"rgba(255,255,255,0.8)",
    description: 'Contratos',
    stats: '89',
    icon: 'money',
  }, {
    color:"rgba(255,255,255,0.8)",
    description: 'Productos',
    stats: '178',
    icon: 'face',
  }, {
    color:"rgba(255,255,255,0.8)",
    description: 'Servicios',
    stats: '32',
    icon: 'refresh',
  }]
  constructor(private _pieChartService: PieChartService,
    protected service: VentasTablesService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,) {
    //this.charts = this._pieChartService.getData();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.charts = this.data;
    this.getVentas();
  }
  getVentas() {
    this.service.allVentas(this.token).subscribe(
                  response => {

                      if(!response.venta) {
                          //this._router.navigate(['/datatables']);
                      }else {
                        console.log(response.venta)
                          this.data[0].stats = response.venta
                          console.log(response.venta)
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

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, number) {
          jQuery(this.el).find('.percent').text(Math.round(number));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
