import { Component,OnInit } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { GLOBAL } from '../../../../services/global';
import { UserService } from '../../../../services/user.service';

import { Inventario } from '../../../../models/inventario';

import * as jsPDF from 'jspdf'


@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss'],
  providers: [UserService, SmartTablesService]
})
export class SmartTables {
  public titulo: string;

  public inventario: Inventario[];
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
      Nserie: {
        title: 'Nserie',
        type: 'number'
      },
      cantidad: {
        title: 'cantidad',
        type: 'number'
      },
      capacidad: {
        title: 'capacidad',
        type: 'number'
      },
      serie: {
        title: 'serie',
        type: 'string',
        editor: {
        type: 'list',
        config: {
          list: [
            { value: 'gm', title: 'gm' },
          ]
        }
      }
      },
      modelo: {
        title: 'modelo',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService,
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
     this.getInventarios();
  }
  download() {
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

                    if(!response.products) {
                        this._router.navigate(['/datatables']);
                    }else {
                        this.inventario = response.products;
                        this.source.load(response.products);
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
          var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true
          };

          new Angular2Csv(this.inventario, 'Inventario',options);
  }

  downloadPDF() {
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


                    if(!response.products) {
                        this._router.navigate(['/datatables']);
                    }else {
                      var columns = [
                          {title: "Nserie", dataKey: "Nserie"},
                          {title: "cantidad", dataKey: "cantidad"},
                          {title: "capacidad", dataKey: "capacidad"},
                          {title: "modelo", dataKey: "modelo"},
                          {title: "serie", dataKey: "serie"}

                      ];
                      var rows = this.inventario
                      console.log(this.inventario);
                      var doc = new jsPDF('p', 'pt');
                      doc.autoTable(columns, rows, {
                      margin: {top: 60},
                      addPageContent: function(data) {
                        doc.text("inventario", 40, 30);
                      }
                  });
                      doc.save('inventario.pdf');
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

                      if(!response.products) {
                          this._router.navigate(['/datatables']);
                      }else {
                          this.inventario = response.products;
                          this.source.load(response.products);
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
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to change?')) {
    this.service.editProducto(this.token, event.data._id, event.newData).subscribe(
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
    this.service.addProducto(this.token, event.newData).subscribe(
        response => {
          console.log(response);
            if(!response) {
                alert("Error en el servidor");
            }else {
                alert ('El producto se ha creado correctamente');
                this.inventario = response.products;
                this.getInventarios();
                event.confirm.reject();

            }
        },
        error => {
            var errorMessage = <any>error;
            if(errorMessage != null) {
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              //this.errorMessage = 0;
              console.log(error);
            }
        }
    );
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteProducto(this.token, event.data._id).subscribe(
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
