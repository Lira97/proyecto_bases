import {Component,OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import { serviciosTablesService } from '../../tables/components/serviciosTables/serviciosTables.service';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';

import { Servicio } from '../../../models/servicios';

import {CalendarService} from './calendar.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  providers: [UserService, serviciosTablesService]
})
export class Calendar {
  public titulo: string;
  public datos:any
  public servicio: Servicio[];
  public identity=this._userService.getIdentity();
  public data ={
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2017-11-23',
    selectable: true,
    selectHelper: true,
    editable: true,
    eventLimit: true,
    events: [
      {
        title: 'Entrega proyecto final',
        start: '2017-11-23 20:00:00',
      }
    ]
  };
  public token=this._userService.getToken();
  public url: string;
  public errorMessage;
  public next_page;
  public prev_page;
  public confirmado;

  public calendarConfiguration:any;
  private _calendar:Object;

  constructor(private _calendarService:CalendarService,protected service: serviciosTablesService,private _userService: UserService) {
    this.titulo = 'Inventario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.getInventarios();
  //this.calendarConfiguration = this.data;
    //this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }
  ngOnInit() {
    console.log(this.data)
    this.calendarConfiguration = this.data;
  }
  getInventarios() {
      let page = 1
              this.service.getData(this.token, page).subscribe(
                  response => {

                      if(!response.servicios) {
                          //this._router.navigate(['/datatables']);
                      }else {
                          this.datos = response.servicios
                          this.datos[19].fecha = this.data.events[0].start
                          console.log(this.data)
                          
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
  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }

  private _onSelect(start, end):void {
    if (this._calendar != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        console.log("title");
        eventData = {
          title: title,
          start: start,
          end: end
        };
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
}
