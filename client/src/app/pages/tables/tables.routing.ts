import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ContratoTables } from './components/contratosTables/contratosTables.component';
import { VentasTables } from './components/ventasTables/ventasTables.component';
import { usuariosTables } from './components/usuariosTables/usuariosTables.component';
import { DataTables } from './components/dataTables/dataTables.component';
import { HotTablesComponent } from './components/hotTables/hotTables.component';
import { serviciosTables } from './components/serviciosTables/serviciosTables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'contratables', component: ContratoTables },
      { path: 'servicestables', component: serviciosTables },
      { path: 'usertables', component: usuariosTables },
      { path: 'smarttables', component: SmartTables },
      { path: 'ventastables', component: VentasTables },
      { path: 'datatables', component: DataTables },
      { path: 'hottables', component: HotTablesComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
