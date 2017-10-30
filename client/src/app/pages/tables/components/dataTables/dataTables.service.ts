
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../../services/global'
import { Inventario } from '../../../../models/inventario';

@Injectable()
export class DataTablesService {
  public url: string;

  constructor(private _http: Http) {
      this.url = GLOBAL.url;
  }

    getInventarios(token, page) {
        /*let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + 'inventarios/'+page, options)
            .map(res => {
              if(res.status < 200 || res.status >= 300) {
        throw new Error('This request has failed ' + res.status);
      }
      else {
        return res.json();
        }
    });*/
    console.log("hola");
  }
}
