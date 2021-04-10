import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, interval, fromEvent } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CommonDataService, CommonMethodService, MastersService, MessagingService } from "../../../../Services/index";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
declare var $;
import { DataTableDirective } from 'angular-datatables';

class CreateTask {

  TaskDescription: string;
  DueDate: Date;
  SelectedPriority: any;
  SelectedAssignee: any;

  constructor() {
    this.TaskDescription = "";
    this.DueDate = null;
    this.SelectedPriority = {};
    this.SelectedAssignee = {};
  }
}

class chatMessage {
  sourceType: string;//sender/receiver
  sourceName: string;
  DateTime: Date;
  MessageType: string;//text/code/link/image/video/pdf
  Message: any;

  constructor() {
    this.sourceType = "";
    this.sourceName = "";
    this.DateTime = null;
    this.MessageType = "";
    this.Message = "";
  }
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  //crud related variables-start
  isAdd: boolean;
  crudData: CreateTask;
  crudActionName: string;
  //crud related variables-end

  //sweet alert variables - start
  successheader: string;
  successmsg: string;
  errormsg: string;
  //sweet alert variables - end

  //component specific variables -start
  priorityList: any = [];
  usersList: any = [];
  minimumDate: Date;
  isLink1: boolean;
  isLink2: boolean;
  userList: any[] = [];
  conversation: chatMessage[] = [];
  //component specific variables -end

  constructor(private commonMethodService: CommonMethodService,
    public commonDataService: CommonDataService,
    private mastersService: MastersService,
    private el: ElementRef, private router: Router,
    private primeNgMessageService: MessageService,
    public notificationService: MessagingService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

    this.crudData = new CreateTask();
    this.isAdd = true;
    this.isLink1 = true;
    this.isLink2 = false;
    this.priorityList = [
      { id: 1, name: "High" },
      { id: 1, name: "Medium" },
      { id: 1, name: "Low" }
    ];

    this.minimumDate = new Date();

    if (this.commonDataService.oClientConfigurationsFromJsonFile == null) {
      if (localStorage.getItem("config") != null) {
        this.commonDataService.oClientConfigurationsFromJsonFile = JSON.parse(localStorage.getItem("config"));
      }
    }
  }

  ngAfterViewInit() {
    this.GetUserList();
    this.GetConversation();
  }

  RouteToPage(source: string) {
    if (source == "back") {
      this.router.navigate(['/home']);
    }
    else if (source == "reshuffle") {
      this.router.navigate(["/modify/reshuffle"]);
    }
  }


  //list data fetch functions - start
  GetUserList() {
    debugger;
    this.mastersService.GetUserList()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: any) => {
        debugger;
        console.log(data);
        if (data.status == "success") {

          this.userList = data.users;
        }
        else {
          this.userList = [];
        }
      });
  }

  GetSetForCrud(source: string, item: any) {
    debugger

    this.crudData = new CreateTask();

    if (source == "Add") {
      this.isAdd = true;
      //this.depForm.resetForm();
    }
    else {
      this.isAdd = false;
      //set selected row for edit
      // this.crudData.Id = item.id;
      // this.crudData.Code = item.depCode;
      // this.crudData.Name = item.depName;
      // this.crudData.Active = item.enabled;
    }
  }

  GetConversation() {
    this.conversation = [
      { sourceType: "sender", sourceName: "Admin", DateTime: new Date(), MessageType: "text", Message: "Hi shobha" },
      { sourceType: "sender", sourceName: "Admin", DateTime: new Date(), MessageType: "text", Message: "Pls tell me about the blocker" },
      { sourceType: "receiver", sourceName: "Shobha", DateTime: new Date(), MessageType: "text", Message: "Hi sir" },
      { sourceType: "receiver", sourceName: "Shobha", DateTime: new Date(), MessageType: "text", Message: "In PrimeNG timer control inside calendar is not working properly and the issue is in primeng plugin" },
      { sourceType: "sender", sourceName: "Admin", DateTime: new Date(), MessageType: "text", Message: "Refer below link" },
      { sourceType: "sender", sourceName: "Admin", DateTime: new Date(), MessageType: "link", Message: "https://google.com" },
      { sourceType: "sender", sourceName: "Admin", DateTime: new Date(), MessageType: "link", Message: "Let me know if it works" },
      { sourceType: "receiver", sourceName: "Shobha", DateTime: new Date(), MessageType: "text", Message: "Ok sir" },
      { sourceType: "receiver", sourceName: "Shobha", DateTime: new Date(), MessageType: "text", Message: "Thanks" }
    ];
  }

  //list data fetch functions - end

  //update functions - start
  UpdateTask(item: any) {
    this.commonDataService.redirectorPage = "Update";
    this.commonDataService.updateTask.next(item);
    this.router.navigate(["/create"]);
  }

  PrepCrudData() {

  }
  //update functions - end

  SwitchTabs(source: string) {
    if (source == "update") {
      this.isLink1 = true;
      this.isLink2 = false;
      this.GetUserList();
    }
    else if (source == "reshuffle") {
      this.isLink1 = false;
      this.isLink2 = true;
      this.RouteToPage("reshuffle");
    }
  }

  SetCrudActionName(action) {
    debugger;
    this.crudActionName = action;
  }

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}

