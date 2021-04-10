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
import { DatePipe } from '@angular/common';

class CreateTask {

  id: string;
  TaskDescription: string;
  DueDate: Date;
  SelectedPriority: any;
  SelectedAssignee: any;

  constructor() {
    this.id = "";
    this.TaskDescription = "";
    this.DueDate = null;
    this.SelectedPriority = {};
    this.SelectedAssignee = {};
  }
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  //crud related variables-start
  isAdd: boolean;
  isView: boolean;
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
  userList: any = [];
  minimumDate: Date;
  @ViewChild("priorityForm") priorityForm: NgForm;
  @ViewChild('refCloseBtn') refCloseBtn: ElementRef;
  showLoaderIcon: boolean;
  //component specific variables -end

  constructor(private commonMethodService: CommonMethodService,
    public commonDataService: CommonDataService,
    private mastersService: MastersService,
    public datepipe: DatePipe,
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
    this.isView = false;
    this.minimumDate = new Date();

    debugger;
    if (this.commonDataService.oClientConfigurationsFromJsonFile == null) {
      if (localStorage.getItem("config") != null) {
        this.commonDataService.oClientConfigurationsFromJsonFile = JSON.parse(localStorage.getItem("config"));
      }
    }

    if (this.commonDataService.userList == null) {
      if (localStorage.getItem("userList") != null) {
        this.userList = JSON.parse(localStorage.getItem("userList"));
      }
    }
    else {
      this.userList = this.commonDataService.userList;
    }

    if (this.commonDataService.priorityList == null) {
      if (localStorage.getItem("priorityList") != null) {
        this.priorityList = JSON.parse(localStorage.getItem("priorityList"));
      }
    }
    else {
      this.priorityList = this.commonDataService.priorityList;
    }

    if (this.commonDataService.redirectorPage.toLowerCase() == "update") {
      debugger;
      this.GetSetForCrud("Edit");
    }
    if (this.commonDataService.redirectorPage.toLowerCase() == "reshuffle" ||
      this.commonDataService.redirectorPage.toLowerCase() == "report") {
      debugger;
      this.GetSetForCrud("View");
    }
  }

  ngAfterViewInit() {

  }

  RouteToPage(source: string) {
    if (source == "back") {
      if (this.commonDataService.redirectorPage == "Home")
        this.router.navigate(['/home']);
      else if (this.commonDataService.redirectorPage == "Update")
        this.router.navigate(['/modify/update']);
      else if (this.commonDataService.redirectorPage == "Reshuffle")
        this.router.navigate(['/modify/reshuffle']);
      else if (this.commonDataService.redirectorPage == "Report")
        this.router.navigate(['/report']);
      else
        this.router.navigate(['/home']);
    }
  }

  //list functions -- start
  GetSetForCrud(source: string) {
    debugger

    this.crudData = new CreateTask();
    if (source == "Add") {
      this.isAdd = true;
      this.isView = false;
      this.priorityForm.resetForm();
    }
    else {
      this.isAdd = false;
      if (source == "View")
        this.isView = true;
      else
        this.isView = false;

      //set selected row for edit
      this.crudData.id = this.commonDataService.itemToUpdateOrView.id;
      this.crudData.TaskDescription = this.commonDataService.itemToUpdateOrView.message;
      this.crudData.DueDate = this.GetDate(this.commonDataService.itemToUpdateOrView.due_date);
      var temp = this.priorityList.filter(x => x.id == this.commonDataService.itemToUpdateOrView.priority);
      this.crudData.SelectedPriority = temp[0];
      temp = this.userList.filter(x => x.id == this.commonDataService.itemToUpdateOrView.assigned_to);
      this.crudData.SelectedAssignee = temp[0];
    }
  }

  GetDate(datetime: string): Date {
    var date = datetime.split(" ")[0];
    var year = Number(date.split("-")[0]);
    var month = Number(date.split("-")[1]);
    var day = Number(date.split("-")[2]);

    var taskDate = new Date(year, month - 1, day);
    return taskDate;
  }

  //list functions -- end

  //update functions --  start
  PrepCrudData() {
    debugger;
    if (this.isAdd) {
      const formData = new FormData();
      formData.append('message', this.crudData.TaskDescription);
      formData.append('due_date', this.datepipe.transform(this.crudData.DueDate, 'yyyy-MM-dd HH:mm:ss'));
      formData.append('priority', this.crudData.SelectedPriority.id);
      formData.append('assigned_to', this.crudData.SelectedAssignee.id);
      this.Save(formData, 'Add');
    }
    else {
      const formData = new FormData();
      formData.append('taskid', this.crudData.id);
      formData.append('message', this.crudData.TaskDescription);
      formData.append('due_date', this.datepipe.transform(this.crudData.DueDate, 'yyyy-MM-dd HH:mm:ss'));
      formData.append('priority', this.crudData.SelectedPriority.id);
      formData.append('assigned_to', this.crudData.SelectedAssignee.id);
      this.Save(formData, 'Edit');
    }
  }

  Save(payload: any, source: string) {
    debugger;

    let action = source;
    this.showLoaderIcon = true;
    this.mastersService.SaveTask(payload, action)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: any) => {
        debugger;
        this.showLoaderIcon = false;
        if (data.status == "success") {

          //update global task list 
          this.commonDataService.isNewTaskAdded.next(true);
          this.successheader = "SUCCESS";
          if (this.isAdd) {
            this.priorityForm.resetForm();
            this.successmsg = "Task has been added successfully";
          }
          else {
            this.successmsg = "Task has been updated successfully";
          }

          this.SweetSuccess();
        }
        else if (data.status == "error") {
          this.errormsg = data.error;
          this.SweetFailure();
        }
      },
        (error) => {
          if (this.isAdd) {
            this.priorityForm.resetForm();
            this.errormsg = "Unable to add task";
          }
          else {
            this.errormsg = "Unable to update task";
          }

          this.SweetFailure();
        }
      );
  }

  //updated functions -- end

  //Sweet alert functions- start-------------------

  SweetSuccess() {
    Swal.fire(
      this.successheader + '!',
      this.successmsg,
      'success'
    );
  }

  SweetFailure() {
    Swal.fire(
      'Failed',
      this.errormsg,
      'error'
    );
  }
  //Sweet alert functions- end-------------------

  SetCrudActionName(action) {
    debugger;
    this.crudActionName = action;
  }

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}
