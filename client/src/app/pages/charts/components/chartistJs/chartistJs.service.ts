import {Injectable} from '@angular/core';
import { Component,OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../../services/global'
import { Venta } from '../../../../models/ventas';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VentasTablesService } from '../../../tables/components/ventasTables/ventasTables.service';
import {BaThemeConfigProvider} from '../../../../theme';
@Component({
  providers: [UserService]
})

@Injectable()
export class ChartistJsService {
  public url: string;
  public token;
  public _data = {
    simpleBarData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [[33,]],
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '300px'
    }
  };
  constructor(protected service: VentasTablesService,private _route: ActivatedRoute,
  private _router: Router,private _baConfig:BaThemeConfigProvider,private _http: Http,private _userService: UserService) {
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.getFecha();

  }
  public getAll() {
    console.log(this._data);
    this.getFecha()
    return this._data;
  }
  getFecha(){
              this.service.getFecha(this.token).subscribe(
                  response => {

                      if(!response) {
                          this._router.navigate(['/datatables']);
                      }else {
                          this._data.simpleBarData.series[0][0]=response.venta;
                          this._data.simpleBarData.series[0][1]=response.venta;
                          this._data.simpleBarData.series[0][2]=response.venta;
                          this._data.simpleBarData.series[0][3]=response.venta;
                          this._data.simpleBarData.series[0][4]=response.venta;
                          this._data.simpleBarData.series[0][5]=response.venta;
                          this._data.simpleBarData.series[0][6]=response.venta;
                          this._data.simpleBarData.series[0][7]=response.venta;
                          this._data.simpleBarData.series[0][8]=response.venta;
                          this._data.simpleBarData.series[0][9]=response.venta;
                          this._data.simpleBarData.series[0][10]=response.venta;
                          this._data.simpleBarData.series[0][11]=response.venta;

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
