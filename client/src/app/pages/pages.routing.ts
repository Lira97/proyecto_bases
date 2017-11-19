import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login',loadChildren: 'app/pages/login/login.module#LoginModule'},
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule',canActivate: [AuthGuard] },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule',canActivate: [AuthGuard] },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
