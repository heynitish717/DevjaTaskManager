import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../Shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import {
  AuthGuardService as AuthGuard
} from '../../../Services/GuardServices/RouteActivate/auth-guard.service';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: '', component: StatusComponent, canActivate: [AuthGuard] }
];

const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);

@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    ChartsModule
  ]
})
export class TeamStatusModule { }
