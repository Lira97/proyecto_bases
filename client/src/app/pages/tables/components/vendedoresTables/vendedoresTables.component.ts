import { Component,OnInit } from '@angular/core';
import { VendedoresTablesService } from './vendedoresTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { GLOBAL } from '../../../../services/global';
import { UserService } from '../../../../services/user.service';

import { Vendedores } from '../../../../models/vendedores';



@Component({
  selector: 'vendedores-tables',
  templateUrl: './vendedoresTables.html',
  styleUrls: ['./vendedoresTables.scss'],
  providers: [UserService, VendedoresTablesService]
})
export class VendedoresTables {
  public titulo: string;

  public vendedores: Vendedores[];
  public identity;
  public token;
  public errorMessage;
  public url: string;
  public next_page;
  public prev_page;
  public confirmado;

    //data;
    //filterQuery = "";
    //rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";
  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      'user._id': {
       title: 'ID',
       valuePrepareFunction: (cell, row) => { return row.user.id_empleado}
          },
      Nclientes:{
        title: 'Nclientes',
        type: 'number'
      },
      'user.email': {
       title: 'email',
       valuePrepareFunction: (cell, row) => { return row.user.email}
     }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: VendedoresTablesService,
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService) {

    this.titulo = 'Inventario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }
  ngOnInit() {

      console.log(this.identity);
      console.log(this.token);
      // Conseguir el listado de artista
     this.getVentas();
  }
  getVentas() {
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
              this.service.getData(this.token, page).subscribe(
                  response => {

                      if(!response.vendedor) {
                          this._router.navigate(['/datatables']);
                      }else {
                        console.log(response);
                          this.vendedores = response.vendedor;
                          this.source.load(response.vendedor);
                          console.log(this.source);
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
      console.log(this.vendedores);
  }
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to change?')) {
    this.service.editContrato(this.token, event.data._id, event.newData).subscribe(
        response => {

            if(!response) {
                alert('Error en el servidor');
            }else {
                alert('El artista se ha editado correctamente');
                this.getVentas();
            }
        },
        error => {
            var errorMessage = <any>error;
            if(errorMessage != null) {
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
            }
        }
    );
  } else {
    event.confirm.reject();
  }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      console.log(event.newData);
    this.service.addContrato(this.token, event.newData).subscribe(
        response => {
          console.log(response);
            if(!response) {
                alert("Error en el servidor");
            }else {
                alert ('El producto se ha creado correctamente');
                this.vendedores = response.vendedores;
                this.getVentas();
                event.confirm.reject();

            }
        },
        error => {
            var errorMessage = <any>error;
            if(errorMessage != null) {
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(errorMessage);
            }
        }
    );
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteContrato(this.token, event.data._id).subscribe(
          response => {
              if(!response) {
                  alert("Error en el servidor");
              }
              this.getVentas();
          },
          error => {
              var errorMessage = <any>error;
              if(errorMessage != null) {
                  var body = JSON.parse(error._body);
                  console.log(errorMessage);
              }
          }
      );
    } else {
      event.confirm.reject();
    }
  }
}
