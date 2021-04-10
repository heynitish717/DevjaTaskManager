import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, throwError, EMPTY, EmptyError, empty, of } from "rxjs";

import {
  tap,
  catchError,
  switchMap,
  finalize,
  filter,
  take
} from "rxjs/operators";
import { CommonDataService, CommonMethodService, MessagingService } from "src/app/Services/index";

@Injectable({ providedIn: "root" })
export class OwinInterceptor implements HttpInterceptor {
  private isTokenRefreshing: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private commonDataService: CommonDataService,
    private authToken: CommonMethodService,
    private errorHandlerService: MessagingService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //if(this.tokenSubject.subscribe()
    return next.handle(this.AttachTokenToRequest(request)).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log("Success in api response");
        }
      }),
      catchError(
        (err): Observable<any> => {
          //debugger;
          if (err instanceof HttpErrorResponse) {
            return throwError(err);
          } else {
            return of({});
          }
        }
      )
    );
  }

  private HandleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }

  private AttachTokenToRequest(request: HttpRequest<any>) {
    //debugger;
    var apiKey = this.commonDataService.oClientConfigurationsFromJsonFile.apiKey;
    this.commonDataService.headers = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "AuthToken": apiKey
      }),
    };
    return request.clone(this.commonDataService.headers);
  }
}
