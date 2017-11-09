import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { UserService } from '../../services/user.service';
import { VentasTablesService } from '../tables/components/ventasTables/ventasTables.service';
import { routing }       from './charts.routing';
import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJsService } from './components/chartistJs/chartistJs.service';
import { AppTranslationModule } from '../../app.translation.module';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Charts,
    ChartistJs
  ],
  providers: [
    ChartistJsService,
    VentasTablesService,
    UserService,

  ]
})
export class ChartsModule {}
