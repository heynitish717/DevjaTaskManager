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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  //datatable related variables-start
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtData: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  //datatable related variables-end

  //sweet alert variables - start
  successheader: string;
  successmsg: string;
  errormsg: string;
  //sweet alert variables - end

  //component specific variables -start
  isLink1: boolean;
  isLink2: boolean;
  taskList: any = [];
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

    this.commonDataService.isTaskListReloaded.subscribe(isTaskListReloaded => {
      if (isTaskListReloaded) {
        this.LoadTaskList();
      }
    });
  }

  ngOnInit(): void {

    this.isLink1 = true;
    this.isLink2 = false;

    this.dtOptions = {
      pagingType: 'simple_numbers',//full_numbers
      pageLength: 5
    };

    if (this.commonDataService.oClientConfigurationsFromJsonFile == null) {
      if (localStorage.getItem("config") != null) {
        this.commonDataService.oClientConfigurationsFromJsonFile = JSON.parse(localStorage.getItem("config"));
      }
    }
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.LoadTaskList();
  }

  RouteToPage(source: string) {
    if (source == "back") {
      this.router.navigate(['/home']);
    }
    else if (source == "reshuffle") {
      this.router.navigate(["/modify/reshuffle"]);
    }
  }

  LoadTaskList() {
    this.rerender();
    debugger;
    if (this.commonDataService.taskList == null) {
      if (localStorage.getItem("taskList") != null) {
        this.taskList = JSON.parse(localStorage.getItem("taskList"));
      }
    }
    else {
      this.taskList = this.commonDataService.taskList;
    }
  }

  //list data fetch functions - start

  UpdateTask(item: any) {
    this.commonDataService.redirectorPage = "Update";
    this.commonDataService.itemToUpdateOrView = item;
    this.router.navigate(["/create"]);
  }

  PrepCrudData(taskid: string) {
    debugger;
    const formData = new FormData();
    formData.append('taskid', taskid);
    this.Save(formData);
  }

  Save(payload: any) {
    debugger;

    this.mastersService.DeleteTask(payload)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: any) => {
        debugger;
        if (data.status == "success") {

          //update global task list 
          this.commonDataService.isNewTaskAdded.next(true);
          this.successheader = "SUCCESS";
          this.successmsg = "Task has been deleted successfully";
          this.SweetSuccess();
        }
        else if (data.status == "error") {
          this.errormsg = data.error;
          this.SweetFailure();
        }
      },
        (error) => {

          this.errormsg = "Unable to delete task";
          this.SweetFailure();
        }
      );
  }

  //Sweet alert functions- start-------------------
  SweetConfirm(taskid: string) {

    debugger;
    let text = "";

    text = "Are you sure you want to delete this task?"
    this.errormsg = "Delete cancelled"

    Swal.fire({
      title: 'Please confirm',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.PrepCrudData(taskid);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //this.SweetCancelled();
      }
    })
  }

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

  //datatable related settings
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
    this.dtTrigger.unsubscribe();
  }
}

