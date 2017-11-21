import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../../services/global'
import { Ingeniero } from '../../../../models/ingeniero';

@Injectable()
export class  ingenieroTablesService{
  public url: string;
  constructor(private _http: Http) {
      this.url = GLOBAL.url;
  }
  addContrato(token, inventario) {
          let params = inventario;
          let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      });
      return this._http.post(this.url + 'save-ingeniero', params, {headers: headers})
          .map(res => {  if(res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            }else {
              console.log(res);
              return res.json();
              }
        });
  }
  editContrato(token, id: string, inventario) {

      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      });

      return this._http.put(this.url + 'update-ingeniero/'+id, inventario, {headers: headers})
          .map(res => res.json());
  }

  getData(token, page) {
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
          });

      let options = new RequestOptions({headers: headers});
      return this._http.get(this.url + 'ingenieros/', options)
          .map(res => {
            if(res.status < 200 || res.status >= 300) {
              throw new Error('This request has failed ' + res.status);
            }else {
              console.log(res);
              return res.json();
              }
        });

  }
  deleteContrato(token, id: string) {
    console.log('id');
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      });
      let options = new RequestOptions({headers: headers});
      return this._http.delete(this.url + 'delete-ingeniero/'+id, options)
          .map(res => res.json());
  }
  metricsTableData = [
    {
      image: 'app/browsers/chrome.svg',
      browser: 'Google Chrome',
      visits: '10,392',
      isVisitsUp: true,
      purchases: '4,214',
      isPurchasesUp: true,
      percent: '45%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/firefox.svg',
      browser: 'Mozilla Firefox',
      visits: '7,873',
      isVisitsUp: true,
      purchases: '3,031',
      isPurchasesUp: false,
      percent: '28%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/ie.svg',
      browser: 'Internet Explorer',
      visits: '5,890',
      isVisitsUp: false,
      purchases: '2,102',
      isPurchasesUp: false,
      percent: '17%',
      isPercentUp: false
    },
    {
      image: 'app/browsers/safari.svg',
      browser: 'Safari',
      visits: '4,001',
      isVisitsUp: false,
      purchases: '1,001',
      isPurchasesUp: false,
      percent: '14%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/opera.svg',
      browser: 'Opera',
      visits: '1,833',
      isVisitsUp: true,
      purchases: '83',
      isPurchasesUp: true,
      percent: '5%',
      isPercentUp: false
    }
  ];

  /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 2000);
    });
  }*/
}
