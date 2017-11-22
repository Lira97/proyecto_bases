import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    return [
      {
        color:"rgba(255,255,255,0.8)",
        description: 'Ventas',
        stats: '57',
        icon: 'person',
      }, {
        color:"rgba(255,255,255,0.8)",
        description: 'Contratos',
        stats: '89',
        icon: 'money',
      }, {
        color:"rgba(255,255,255,0.8)",
        description: 'Productos',
        stats: '178',
        icon: 'face',
      }, {
        color:"rgba(255,255,255,0.8)",
        description: 'Servicios',
        stats: '32',
        icon: 'refresh',
      }
    ];
  }
}
