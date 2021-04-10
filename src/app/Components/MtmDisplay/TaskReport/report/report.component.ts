import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, ViewEncapsulation, ChangeDetectorRef, DebugEventListener } from '@angular/core';
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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  //datatable related variables-start
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtData: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  //datatable related variables-end

  //component specific variables -start
  priorityList: any[];
  minimumDate: Date;
  taskList: any[];
  originalList: any[];
  maxDateValue: Date;
  fromDate: Date;
  toDate: Date;
  assigneeList: any[];
  selectedAssignee: any;
  selectedPriority: any;
  @ViewChild("reportForm") reportForm: NgForm;
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

    this.fromDate = null;
    this.toDate = null;
    this.selectedAssignee = null;
    this.selectedPriority = null;
    this.dtOptions = {
      pagingType: 'simple_numbers',//full_numbers
      pageLength: 5
    };

    debugger;
    if (this.commonDataService.oClientConfigurationsFromJsonFile == null) {
      if (localStorage.getItem("config") != null) {
        this.commonDataService.oClientConfigurationsFromJsonFile = JSON.parse(localStorage.getItem("config"));
      }
    }

    if (this.commonDataService.userList == null) {
      if (localStorage.getItem("userList") != null) {
        this.assigneeList = JSON.parse(localStorage.getItem("userList"));
      }
    }
    else {
      this.assigneeList = this.commonDataService.userList;
    }

    if (this.commonDataService.priorityList == null) {
      if (localStorage.getItem("priorityList") != null) {
        this.priorityList = JSON.parse(localStorage.getItem("priorityList"));
      }
    }
    else {
      this.priorityList = this.commonDataService.priorityList;
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
    if (this.commonDataService.taskList == null || typeof this.commonDataService.taskList == "undefined") {
      if (localStorage.getItem("taskList") != null) {
        this.originalList = this.taskList = JSON.parse(localStorage.getItem("taskList"));
      }
    }
    else {
      this.originalList = this.taskList = JSON.parse(JSON.stringify(this.commonDataService.taskList));
    }
  }

  GetReportsList() {
    debugger;
    this.rerender();
    this.taskList = this.originalList;
    if (this.fromDate != null && this.toDate != null) {

      var tempList = [];
      for (var i = 0; i < this.taskList.length; i++) {
        var date = this.GetDate(this.taskList[i]["due_date"]);

        if (this.fromDate <= date && date <= this.toDate) {
          tempList.push(this.taskList[i]);
        }
      }
      this.taskList = tempList;
    }

    if (this.selectedAssignee != null) {
      this.taskList = this.taskList.filter(x => x.assigned_to == this.selectedAssignee.id);
    }

    if (this.selectedPriority != null) {
      this.taskList = this.taskList.filter(x => x.priority == this.selectedPriority.id);
    }

    if (this.fromDate == null && this.toDate == null && this.selectedAssignee == null &&
      this.selectedPriority == null) {
      this.taskList = JSON.parse(JSON.stringify(this.commonDataService.taskList));
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

  ViewTask(item: any) {
    this.commonDataService.redirectorPage = "Report";
    this.commonDataService.itemToUpdateOrView = item;
    this.router.navigate(["/create"]);
  }

  ResetForm() {
    debugger;

    this.reportForm.reset();
    this.LoadTaskList();
  }

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


