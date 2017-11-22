import { Component,OnInit } from '@angular/core';
import { usuariosTablesService } from './usuariosTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { GLOBAL } from '../../../../services/global';
import { UserService } from '../../../../services/user.service';

import { User } from '../../../../models/users';

import * as jsPDF from 'jspdf'

@Component({
  selector: 'usuarios-tables',
  templateUrl: './usuariosTables.html',
  styleUrls: ['./usuariosTables.scss'],
  providers: [UserService, usuariosTablesService]
})
export class usuariosTables {
  public titulo: string;

  public user: User[];
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
      _id: {
        title: 'id_empleado',
        type: 'string'
      },
      nombre: {
        title: 'nombre',
        type: 'string'
      },
      email: {
        title: 'email',
        type: 'string'
      },
      password: {
        title: 'password',
        type: 'string'
      },
      sueldo: {
        title: 'sueldo',
        type: 'number'
      },
      role: {
        title: 'role',
        type: 'string',
        editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Administrador', title: 'Administrador' },
            { value: 'Ingeniero', title: 'Ingeniero' },
            { value: 'Vendedor', title: 'Vendedor' },
          ]
        }
      }
      },
      telefono: {
        title: 'telefono',
        type: 'number'
      },
      seguro: {
        title: 'seguro',
        type: 'string'
      },
      age: {
        title: 'age',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: usuariosTablesService,
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

                    if(!response.user) {
                        this._router.navigate(['/datatables']);
                    }else {
                      this.user = response.user;
                      this.source.load(response.user);
                      console.log(this.user);
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

          new Angular2Csv(this.user, 'Inventario',options);
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

                    if(!response.user) {
                        this._router.navigate(['/datatables']);
                    }else {
                      var columns = [
                          {title: "Email", dataKey: "email"},
                          {title: "age", dataKey: "age"},
                          {title: "id_empleado", dataKey: "id_empleado"},
                          {title: "nombre", dataKey: "nombre"},
                          {title: "password", dataKey: "password"},
                          {title: "role", dataKey: "role"},
                          {title: "seguro", dataKey: "seguro"},
                          {title: "sueldo", dataKey: "sueldo"},
                          {title: "telefono", dataKey: "telefono"}

                      ];
                      var rows = this.user
                      console.log(this.user);
                      var doc = new jsPDF('p', 'pt');
                      doc.autoTable(columns, rows, {
                      margin: {top: 60},
                      addPageContent: function(data) {
                      	doc.text("Usuarios", 40, 30);
                      }
                  });
                      doc.save('table.pdf');
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

                      if(!response.user) {
                          //this._router.navigate(['/datatables']);
                      }else {
                          this.user = response.user;
                          this.source.load(response.user);
                          console.log(this.user);
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
    this.service.addProducto(event.newData).subscribe(
        response => {
          console.log(response);
            if(!response) {
                alert("Error en el servidor");
            }else {
                alert ('El producto se ha creado correctamente');
                this.user = response.user;
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
