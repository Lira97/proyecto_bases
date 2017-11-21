import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { ContratoTables } from './components/contratosTables/contratosTables.component';
import { VentasTables } from './components/ventasTables/ventasTables.component';
import { usuariosTables } from './components/usuariosTables/usuariosTables.component';
import { VendedoresTables } from './components/vendedoresTables/vendedoresTables.component';
import { serviciosTables } from './components/serviciosTables/serviciosTables.component';
import { ingenieroTables } from './components/ingenieroTables/ingenieroTables.component';


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
      { path: 'vendedortables', component: VendedoresTables },
      { path: 'ingenierotables', component: ingenieroTables },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
