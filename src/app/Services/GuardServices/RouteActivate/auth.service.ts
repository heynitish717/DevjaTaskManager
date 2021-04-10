import { Injectable, OnDestroy } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, Subscription } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap } from "rxjs/operators";
import { MessageService } from 'primeng/api';//Toast
import { MessagingService } from '../../MethodServices/messaging.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy {
  // constructor(public jwtHelper: JwtHelperService) { }
  // // ...
  // public isAuthenticated(): boolean {
  //   debugger;
  //   var token;
  //   if (localStorage.getItem('accesstokenobj'))
  //     token = localStorage.getItem('accesstokenobj');
  //   else
  //     return false;

  //   // Check whether the token is expired and return true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  //}

  private readonly onDestroy = new Subject<void>();

  constructor(private primeNgMessageService: MessageService, public notificationService: MessagingService) {
  }
  // ...
  public isAuthenticated(): boolean {
    //debugger;
    var token;
    if (localStorage.getItem('token'))
      token = localStorage.getItem('token');
    else {
      this.notificationService.getMessage()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((message) => {
          //debugger;
          this.primeNgMessageService.add(message);
        });
      this.notificationService.CommonErrorMessage("Error", "Please login again.");
      return false;
    }

    return true;
  }

  //Components unloads or get destroyed on browser tab close or route change
  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}