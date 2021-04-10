import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, interval, fromEvent } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonDataService } from "../../../Services/DataServices/common-data.service";
import { CommonMethodService } from "../../../Services/MethodServices/common-method.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideAnim', [
      state('opened', style({
        height: '*',
        margin: '0px',
        overflow: 'hidden',
        paddingTop: '0px',
        paddingBottom: '0px'
      })),
      state('closed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('opened <=> closed', [
        animate('0.3s')
      ])
    ]),

    trigger('navbarAnim', [
      state('Open', style({
        marginLeft: '264px',
        width: 'calc(100% - 264px)',
        zIndex: '1028',
        display: 'flex',
        minHeight: '70px',
        padding: '0',
        position: 'relative',
        top: '0',
        color: '#fff'
      })),
      state('Close', style({
        marginLeft: '80px',
        width: 'calc(100% - 80px)',
        zIndex: '1028',
        display: 'flex',
        minHeight: '70px',
        padding: '0',
        position: 'relative',
        top: '0',
        color: '#fff'
      })),
      transition('Open <=> Close', [
        animate('0.1s')
      ])
    ]),
  ],
})
export class NavbarComponent implements OnInit {

  sideBar: boolean = true;
  slideMaster: boolean = false;
  slideSiteSettings: boolean = false;
  slideQuestionSettings: boolean = false;
  slideUserSettings: boolean = false;
  slideReport: boolean = false;
  navbarAnim: string;

  constructor(public commonDataService: CommonDataService,
    private commonMethodService: CommonMethodService,
    private router: Router, ) {
  }

  ngOnInit() {
  }
}
