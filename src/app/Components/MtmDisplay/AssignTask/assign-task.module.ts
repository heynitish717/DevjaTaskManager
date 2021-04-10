import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../Shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import {
  AuthGuardService as AuthGuard
} from '../../../Services/GuardServices/RouteActivate/auth-guard.service';
import { ReshuffleComponent } from './reshuffle/reshuffle.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'update', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'reshuffle', component: ReshuffleComponent, canActivate: [AuthGuard] }
];

const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);

@NgModule({
  declarations: [ReshuffleComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    ChartsModule
  ]
})
export class AssignTaskModule { }
