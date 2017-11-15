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
      defaultDate: '2017-11-14',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'Entrega proyecto final',
          start: '2017-12-23 3:4:41',
          color: dashboardColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2018-01-01',
          end: '2018-01-10',
          color: dashboardColors.blueStone
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: dashboardColors.gossip
        }
      ]
    };
  }
}
