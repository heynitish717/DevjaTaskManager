import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, interval, fromEvent } from "rxjs";
import { CommonDataService, CommonMethodService } from "../../../Services/index";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  componentLoaded: string;
  showHideListBtn: boolean = true;
  showLogout: boolean = false;
  isOperator: boolean;

  constructor(public dataService: CommonDataService,
    private router: Router,
    private commonMethodService: CommonMethodService) {


  }

  ngOnInit() {
    this.isOperator = false;
  }

  showSideBar() {
    this.dataService.showSideBar = true;
  }

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}
