import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataTablesService } from './dataTables.service';
import { GLOBAL } from '../../../../services/global';
import { UserService } from '../../../../services/user.service';

import { Inventario } from '../../../../models/inventario';
import { InventarioService } from '../../../../services/inventario.service';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss'],
  providers: [UserService, InventarioService]
})
export class DataTables implements OnInit{
  public titulo: string;

  public inventario: Inventario[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  public confirmado;

    //data;
    //filterQuery = "";
    //rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";

    constructor(
    private service: InventarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService) {
    /*this.service.getData().then((data) => {
      this.data = data;
    });*/
    this.titulo = 'Inventario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;

  }
  ngOnInit() {
      console.log('artist-list.componenet.ts cargado');
      console.log(this.identity);
      console.log(this.token);
      // Conseguir el listado de artista
      this.getInventarios();

  }
  getInventarios() {
      //obtengo parametros que vienen por la url
      this._route.params.forEach((params: Params) => {
          let page = +params['page'];
          page = 1

          if(!page) {
              page = 1;
          }else {
              this.next_page = page+1;
              this.prev_page = page-1;

              if(this.prev_page == 0) {
                  this.prev_page = 1;
              }
              this.service.getInventarios(this.token, page).subscribe(
                  response => {

                      if(!response.products) {
                          this._router.navigate(['/datatables']);
                      }else {
                          this.inventario = response.products;
                          console.log(this.inventario);
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
      });
  }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
