import { Routes, RouterModule }  from '@angular/router';
import { Login } from './login.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
