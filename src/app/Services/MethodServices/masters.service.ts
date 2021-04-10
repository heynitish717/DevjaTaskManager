import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, EMPTY, throwError } from "rxjs";
import { catchError, map, tap, concatMap } from "rxjs/operators";
import { HttpParams, HttpHeaders, HttpClient, HttpBackend, HttpErrorResponse } from "@angular/common/http";
import { CommonDataService } from "../DataServices/common-data.service";
import { MessagingService } from "./messaging.service";
import { ConfigModel } from "src/app/Models/index";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class MastersService {

  httpOptions = this.commonDataService.headers;

  private httpInterceptorSkipper: HttpClient;

  token: string;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private commonDataService: CommonDataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private messageService: MessagingService,
  ) {
    this.httpInterceptorSkipper = new HttpClient(handler);
  }

  //Starts-Get masters list-------------------------------------------------
  public GetUserList(): Observable<any> {
    debugger;

    return this.http.get<any>(this.commonDataService.oClientConfigurationsFromJsonFile.optiqApiUrl + "listusers")
      .pipe(
        map(response => {
          debugger;
          return response
        }),
        catchError(error => {
          debugger;
          //this.handleError(error)
          //return EMPTY;
          return throwError(error);
        })
      );
  }

  public GetTaskList(): Observable<any> {
    debugger;

    return this.http.get<any>(this.commonDataService.oClientConfigurationsFromJsonFile.optiqApiUrl + "list")
      .pipe(
        map(response => {
          debugger;
          return response
        }),
        catchError(error => {
          debugger;
          //this.handleError(error)
          //return EMPTY;
          return throwError(error);
        })
      );
  }

  //-Ends---------------------------------------------------------


  //Starts-Update masters list-------------------------------------------------
  public SaveTask(payload: any, action: string): Observable<any> {
    debugger;

    let apiEndPoint = "";

    if (action == 'Add') {
      apiEndPoint = "create";
    }
    else {
      apiEndPoint = "update";
    }

    return this.http.post<any>(this.commonDataService.oClientConfigurationsFromJsonFile.optiqApiUrl + apiEndPoint, payload)
      .pipe(
        map(response => {
          debugger;
          return response
        }),
        catchError(error => {
          debugger;
          //this.handleError(error)
          //return EMPTY;
          return throwError(error);
        })
      );
  }

  public DeleteTask(payload: any): Observable<any> {
    debugger;

    return this.http.post<any>(this.commonDataService.oClientConfigurationsFromJsonFile.optiqApiUrl + "delete", payload)
      .pipe(
        map(response => {
          debugger;
          return response
        }),
        catchError(error => {
          debugger;
          //this.handleError(error)
          //return EMPTY;
          return throwError(error);
        })
      );
  }

  //Ends---------------------------------------------------------

  //Utitlity functions
  ReplaceUndefinedWithEmptyString(object: any): any {
    //Replace undefined values with string
    //debugger;
    let objKeyArray = Object.keys(object);
    for (var i = 0; i < objKeyArray.length; i++) {
      if (typeof object[objKeyArray[i]] == "undefined") {
        object[objKeyArray[i]] = "";
      }
    }

    return object;
  }
  //Ends
}