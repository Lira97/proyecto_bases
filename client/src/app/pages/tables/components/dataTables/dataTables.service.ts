import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../../services/global'
import { Contrato } from '../../../../models/inventario';

@Injectable()
export class DataTablesService {
  public url: string;

  constructor(private _http: Http) {
      this.url = GLOBAL.url;
  }

  getInventarios(token, page) {
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      });

      let options = new RequestOptions({headers: headers});
      return this._http.get(this.url + 'inventarios/'+page, options)
          .map(res => res.json());


  }
  dataTableData = [{
        'name': 'Wing',
        'email': 'tellus.eu.augue@arcu.com',
        'regDate': '2016-01-09T14:48:34-08:00',
        'city': 'Paglieta',
        'age': 25
    }
];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.dataTableData);
      }, 20);
    });
  }
}
