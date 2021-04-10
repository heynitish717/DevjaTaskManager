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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject<void>();

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
  }

  ngAfterViewInit() {
  }

  RouteToPage(source: string) {
    this.commonDataService.redirectorPage = "Home";
    if (source == "create") {
      this.router.navigate(['/create']);
    }
    else if (source == "modify") {
      this.router.navigate(['/modify/update']);
    }
    else if (source == "report") {
      this.router.navigate(['/report']);
    }
    else if (source == "status") {
      this.router.navigate(['/status']);
    }
  }

  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }

}
