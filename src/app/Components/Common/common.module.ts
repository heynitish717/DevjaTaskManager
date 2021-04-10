import { NgModule } from "@angular/core";
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../../Components/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { NetworkErrorComponent } from './network-error/network-error.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainComponent,
    NetworkErrorComponent
  ],
  exports: [MainComponent],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class Common_Module { }
