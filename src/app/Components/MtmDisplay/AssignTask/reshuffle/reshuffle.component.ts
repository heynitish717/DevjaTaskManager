import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, interval, fromEvent } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MessageService } from 'primeng/api';
import { CommonDataService, CommonMethodService, MastersService, MessagingService } from "../../../../Services/index";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
declare var $;
import { DataTableDirective } from 'angular-datatables';

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
  selector: 'app-reshuffle',
  templateUrl: './reshuffle.component.html',
  styleUrls: ['./reshuffle.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ReshuffleComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

  //sweet alert variables - start
  successheader: string;
  successmsg: string;
  errormsg: string;
  //sweet alert variables - end

  //component specific variables -start
  taskList: any[] = [];
  highPriorityTaskList: any[];
  mediumPriorityTaskList: any[];
  lowPriorityTaskList: any[];
  droppedItem: any;
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

    this.highPriorityTaskList = [];
    this.mediumPriorityTaskList = [];
    this.lowPriorityTaskList = [];

    if (this.commonDataService.oClientConfigurationsFromJsonFile == null) {
      if (localStorage.getItem("config") != null) {
        this.commonDataService.oClientConfigurationsFromJsonFile = JSON.parse(localStorage.getItem("config"));
      }
    }

    if (this.commonDataService.taskList == null) {
      if (localStorage.getItem("taskList") != null) {
        this.taskList = JSON.parse(localStorage.getItem("taskList"));
      }
    }
    else {
      this.taskList = this.commonDataService.taskList;
    }

    if (this.taskList.length > 0) {
      this.highPriorityTaskList = this.taskList.filter(x => x.priority == "1");
      this.mediumPriorityTaskList = this.taskList.filter(x => x.priority == "2");
      this.lowPriorityTaskList = this.taskList.filter(x => x.priority == "3");
    }
    else {
      this.highPriorityTaskList = [];
      this.mediumPriorityTaskList = [];
      this.lowPriorityTaskList = [];
    }
  }

  ngAfterViewInit() {
  }

  RouteToPage(source: string) {
    this.router.navigate(['/modify/update']);
  }

  drop(event: CdkDragDrop<string[]>) {

    debugger;
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)

      if (event.container.id == "dropList1") {
        this.droppedItem = this.highPriorityTaskList[event.currentIndex];
        this.droppedItem.priority = "1";
      }
      else if (event.container.id == "dropList2") {
        this.droppedItem = this.mediumPriorityTaskList[event.currentIndex];
        this.droppedItem.priority = "2";
      }
      else if (event.container.id == "dropList3") {
        this.droppedItem = this.lowPriorityTaskList[event.currentIndex];
        this.droppedItem.priority = "3";
      }
      // console.log("After");
      // console.log(this.droppedItem);

      this.PrepCrudData();
    }
  }

  ViewTask(item: any) {
    this.commonDataService.redirectorPage = "Reshuffle";
    this.commonDataService.itemToUpdateOrView = item;
    this.router.navigate(["/create"]);
  }

  PrepCrudData() {
    debugger;
    const formData = new FormData();
    formData.append('taskid', this.droppedItem.id);
    formData.append('message', this.droppedItem.message);
    formData.append('due_date', this.droppedItem.due_date);
    formData.append('priority', this.droppedItem.priority);
    formData.append('assigned_to', this.droppedItem.assigned_to);
    this.Save(formData, 'Edit');
  }

  Save(payload: any, source: string) {
    debugger;

    let action = source;
    this.mastersService.SaveTask(payload, action)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: any) => {
        debugger;
        if (data.status == "success") {

          //update global task list           
          this.successheader = "SUCCESS";
          this.successmsg = "Task priority has been updated successfully";
          this.SweetSuccess();
          this.commonDataService.isNewTaskAdded.next(true);
        }
        else if (data.status == "error") {
          this.errormsg = data.error;
          this.SweetFailure();
        }
      },
        (error) => {
          this.errormsg = "Unable to update task priority";
          this.SweetFailure();
        }
      );
  }

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

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}


