import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global'
import { Inventario } from '../models/inventario';

@Injectable()
export class InventarioService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addProducto(token, inventario: Inventario) {
        let params = JSON.stringify(inventario);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'save-producto', params, {headers: headers})
            .map(res => res.json());
    }

    editProducto(token, id: string, inventario: Inventario) {
        let params = JSON.stringify(inventario);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'update-inventario/'+id, params, {headers: headers})
            .map(res => res.json());
    }

    deleteProducto(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + 'delete-inventario/'+id, options)
            .map(res => res.json());
    }

    getInventarios(token, page) {
        console.log("hola");
        let headers = new Headers({
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
        console.log(res);
        return res.json();
        }
    });

    }

    getProducto(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + 'inventario/'+id, options)
            .map(res => res.json());
    }
}
