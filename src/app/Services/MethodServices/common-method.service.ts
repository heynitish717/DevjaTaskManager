import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, EMPTY, throwError, fromEvent, Observer, merge } from "rxjs";
import { catchError, map, tap, concatMap } from "rxjs/operators";
import { HttpParams, HttpHeaders, HttpClient, HttpBackend, HttpErrorResponse } from "@angular/common/http";
import { CommonDataService } from "../DataServices/common-data.service";
import { MessagingService } from "./messaging.service";
import {
  ConfigModel
} from "src/app/Models/index";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class CommonMethodService {

  private httpInterceptorSkipper: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private commonDataService: CommonDataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private messageService: MessagingService
  ) {
    this.httpInterceptorSkipper = new HttpClient(handler);
  }

  GetConfig(): Observable<any> {
    this.commonDataService.isTokenRequest = true;
    return this.httpInterceptorSkipper.get<ConfigModel>("assets/config/config.json")
      .pipe(
        map(data => {
          if (data != null && data != undefined) {
            this.commonDataService.oClientConfigurationsFromJsonFile = data; // init configuration from config.json
            this.commonDataService.oClientConfigurationsFromJsonFile.deviceDetectionFailurePopupTimer *= 1000;
            this.commonDataService.oClientConfigurationsFromJsonFile.deviceReadNextAttemptTimer *= 1000;
            localStorage.setItem("config", JSON.stringify(data));

            // this.stateMgmt.InfoLogger(
            //   "config.json has been read and initialized",
            //   data
            // );
          } else {
            //this.stateMgmt.ErrorLogger("could not read config.json!!!", data);
          }
          //alert("GetConfig ends")
          return EMPTY;
        }),
        catchError(error => {
          this.handleError(error)
          return EMPTY;
        })
      );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @error - the error object received or created
   */
  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 0) {//Errors returned without HttpInterceptor interference
        //Choose one specific error response code for form error handling
        this.messageService.CommonErrorHandler(error.status, error);
      }
      else (error.status == 400)
      {
        if (error.error != null)
          this.messageService.CommonErrorHandler(Number(error.error.error), error);
      }
    }
    else//Errors returned with HttpInterceptor interference
      this.messageService.CommonErrorHandler(-1, error);
  }
}
