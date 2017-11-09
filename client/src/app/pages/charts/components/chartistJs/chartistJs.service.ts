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
export interface Frequency {
  letter: string,
  frequency: number
}

@Component({
  providers: [UserService]
})

@Injectable()
export class ChartistJsService {
  public url: string;
  public token;
  public storedata;
  public STATISTICS = [
    {letter: "Jan", frequency: 90},
    {letter: "Feb", frequency: 12},
    {letter: "Mar", frequency: 53},
    {letter: "Apr", frequency: 32},
    {letter: "May", frequency: 12},
    {letter: "Jun", frequency: 32},
    {letter: "Jul", frequency: 45},
    {letter: "Aug", frequency: 48},
    {letter: "Sep", frequency: 89},
    {letter: "Oct", frequency: 12},
    {letter: "Nov", frequency: 12},
    {letter: "Dec", frequency: 12},
  ];
  constructor(protected service: VentasTablesService,private _route: ActivatedRoute,
  private _router: Router,private _baConfig:BaThemeConfigProvider,private _http: Http,private _userService: UserService) {
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
  }
  ngOnInit() {
  }
  public getAll() {

    return this.STATISTICS
  }
}
