import { Component,OnInit } from '@angular/core';
import { ContratosTablesService } from './contratosTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


import { GLOBAL } from '../../../../services/global';
import { UserService } from '../../../../services/user.service';

import { Contrato } from '../../../../models/contratos';



@Component({
  selector: 'contratos-tables',
  templateUrl: './contratosTables.html',
  styleUrls: ['./contratosTables.scss'],
  providers: [UserService, ContratosTablesService]
})
export class ContratoTables {
  public titulo: string;

  public contratos: Contrato[];
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
      id_contrato: {
        title: 'id_contrato',
        type: 'number'
      },
      nombreEmpresa: {
        title: 'Empresa',
        type: 'string'
      },
      valor: {
        title: 'valor',
        type: 'number'
      },
      zona: {
        title: 'zona',
        type: 'string'
      },
      telefono: {
        title: 'telefono',
        type: 'string'
      },
      servicios: {
        title: 'servicios',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ContratosTablesService,
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
              this.service.getData(this.token, page).subscribe(
                  response => {

                      if(!response.contratos) {
                          this._router.navigate(['/datatables']);
                      }else {
                          this.contratos = response.contratos;
                          this.source.load(response.contratos);
                          console.log(this.contratos);
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
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to change?')) {
    this.service.editContrato(this.token, event.data._id, event.newData).subscribe(
        response => {

            if(!response) {
                alert('Error en el servidor');
            }else {
                alert('El artista se ha editado correctamente');
                this.getInventarios();
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
                this.contratos = response.contratos;
                this.getInventarios();
                event.confirm.reject();

            }
        },
        error => {
            var errorMessage = <any>error;
            if(errorMessage != null) {
              var body = JSON.parse(error._body);
              console.log(errorMessage);
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
              this.getInventarios();
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
