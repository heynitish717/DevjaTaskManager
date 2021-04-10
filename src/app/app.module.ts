import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OwinInterceptor } from "./Services/HTTP Interceptor/owin-interceptor.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Common_Module } from "./Components/Common/common.module";
import { AppComponent } from "./app.component";
import { MessageService } from "primeng/api";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SharedModule } from './Components/Shared/shared.module';
import { CommonDataService } from './Services/DataServices/common-data.service';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { SizeDetectorComponent } from './Components/Shared/size-detector-component/size-detector-component.component';
import { DatePipe } from "@angular/common";

@NgModule({
	declarations: [AppComponent, SizeDetectorComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule.forRoot(),
		HttpClientModule,
		BrowserAnimationsModule,
		Common_Module,
		NgIdleKeepaliveModule.forRoot()
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: OwinInterceptor, multi: true },
		{ provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
		DatePipe,
		MessageService,
		CommonDataService
	],
	bootstrap: [AppComponent],
	entryComponents: [],
})
export class AppModule {
}
