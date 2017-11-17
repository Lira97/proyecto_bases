import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

@Injectable()
export class CalendarService {


  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;

    return {
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
  }
}
