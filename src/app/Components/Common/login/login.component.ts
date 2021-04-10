import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, fromEvent, Subscription } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError, debounce } from "rxjs/operators";
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CommonDataService, CommonMethodService, MastersService } from "../../../Services/index";
import { MessagingService } from "../../../Services/index";
import { NgxSpinnerService } from "ngx-spinner";
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  loginId: string = "";
  password: string = "";
  isDisabled: boolean = false;
  iserr: boolean = false;
  authenticationMode: string = "";
  message: string = '';
  UserDetails: any = {};
  loading: boolean;
  sub1: Subscription;
  sub2: Subscription;

  loader = this.loadingBar.useRef('router');
  loaderEndSubscription: Subscription;
  showLoaderIcon: boolean;

  constructor(
    private commonMethodService: CommonMethodService,
    private commonDataService: CommonDataService,
    private masterService: MastersService,
    private el: ElementRef, private router: Router,
    private primeNgMessageService: MessageService,
    public notificationService: MessagingService,
    private spinner: NgxSpinnerService,
    private loadingBar: LoadingBarService
  ) {
    router.events.pipe(takeUntil(this.onDestroy)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.commonDataService.activeUrl = e.url;
      }
    });

    this.commonDataService.isNewTaskAdded.subscribe(isNewTaskAdded => {
      debugger;
      if (isNewTaskAdded) {
        this.GetTaskList();
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.commonDataService.loader = this.loadingBar.useRef('router');
    this.showLoaderIcon = false;
  }


  async onLoginClick() {
    this.showLoaderIcon = true;
    this.commonDataService.loader.start();
    debugger;
    this.commonDataService.loggedIn.next(true);


    if (this.loginId.toLowerCase() == "admin" &&
      this.password.toLowerCase() == "1234") {
      this.GetUserList();
      this.GetPriorityList();
      this.GetTaskList();
      var apiKey = this.commonDataService.oClientConfigurationsFromJsonFile.apiKey;
      localStorage.setItem("token", apiKey);
      this.router.navigate(["/home"]);
    }
    else {
      this.showLoaderIcon = false;
      this.notificationService.CommonErrorMessage("Error", "Login id or Password is not valid");
    }
  }

  GetUserList() {
    debugger;
    this.masterService.GetUserList()
      .subscribe((data: any) => {
        debugger;
        console.log(data);
        if (data.status == "success") {

          this.commonDataService.userList = data.users;

          localStorage.setItem("userList", JSON.stringify(this.commonDataService.userList));
        }
        else {
          this.commonDataService.userList = [];
        }
      });
  }

  GetPriorityList() {
    this.commonDataService.priorityList = [
      { id: 1, name: "High" },
      { id: 2, name: "Medium" },
      { id: 3, name: "Low" }
    ];

    localStorage.setItem("priorityList", JSON.stringify(this.commonDataService.priorityList));
  }

  GetTaskList() {
    debugger;
    this.masterService.GetTaskList()
      .subscribe((data: any) => {
        debugger;
        console.log(data);
        if (data.status == "success") {

          this.commonDataService.taskList = data.tasks;
        }
        else {
          this.commonDataService.taskList = [];
        }

        if (localStorage.getItem("taskList") != null) {
          localStorage.removeItem("taskList");
          this.commonDataService.isTaskListReloaded.next(true);
        }
        localStorage.setItem("taskList", JSON.stringify(this.commonDataService.taskList));
      });
  }

  //Components unloads or get destroyed on browser tab close or route change
  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}
