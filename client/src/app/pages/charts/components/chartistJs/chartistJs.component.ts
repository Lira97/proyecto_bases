import {Component} from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {ChartistJsService} from './chartistJs.service';

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
  providers: [UserService]
})

export class ChartistJs {

  data:any;
  constructor(private _chartistJsService:ChartistJsService) {
    this.data = this._chartistJsService.getAll();
  }
}
