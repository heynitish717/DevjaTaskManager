import {
  Component, OnInit, AfterViewInit,
  OnDestroy, ElementRef, HostListener,
  Renderer2, ViewChild, HostBinding
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, fromEvent, Subscription } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import { CommonDataService, CommonMethodService } from "./Services/index";
import { ErrorMessageGroup, SCREEN_SIZE } from './Models/index';
import { MessagingService, ResizeService } from "./Services/index";
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import Swal from 'sweetalert2';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly onDestroy = new Subject<void>();
  loading: boolean;
  //loader = this.loadingBar.useRef('router');
  activeurl: string;
  scrollListener: any;
  size: SCREEN_SIZE;

  //idle settings
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  showNavarResponsive: string;
  usericonclickanim: string;
  menu1iconclickanim: string;
  menu2iconclickanim: string;
  menu3iconclickanim: string;
  menu4iconclickanim: string;

  //sweet alert variables - start
  successheader: string;
  successmsg: string;
  errormsg: string;
  //sweet alert variables - end
  @ViewChild("mainNav") mianNav: ElementRef;
  @ViewChild("responsiveMenu") responsiveMenu: ElementRef;
  nav_open: boolean;
  sidebar_minimizer: boolean;

  constructor(private commonMethodService: CommonMethodService,
    public commonDataService: CommonDataService,
    public notificationService: MessagingService,
    private router: Router,
    private loadingBar: LoadingBarService,
    private idle: Idle, private keepalive: Keepalive,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private resizeSvc: ResizeService) {

    // subscribe to the size change stream
    this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;

      if (x == 0 || x == 1 || x == 2) {
        this.showNavarResponsive = "mobileclosed";
      }
      else {
        this.showNavarResponsive = "mobileclosed";///"desktop";
      }
    });

    //Menu expand collapse animation subscription
    this.commonDataService.toggleMenu.subscribe(source => {

      if (source == "mobile") {
        this.sidebar_minimizer = false;
        if (this.nav_open)
          this.nav_open = false;
        else
          this.nav_open = true;
      }
      else {
        this.nav_open = true;
        if (this.sidebar_minimizer)
          this.sidebar_minimizer = false;
        else
          this.sidebar_minimizer = true;
      }

    });

    router.events.pipe(takeUntil(this.onDestroy)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url == "/") {
          this.LoadConfig();
        }
      }

      // sets the ping interval to 15 seconds
      keepalive.interval(5);
      keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    });

    //idle timeout subscribtions     

    idle.onTimeout.subscribe(() => {
      if (this.commonDataService.activeUrl != "/") {
        this.SweetConfirm();
      }
    });
  }

  idleTimeOutSettings(activeurl: string) {
    //debugger;
    this.idle.setIdle(this.commonDataService.oClientConfigurationsFromJsonFile.idletthreshold);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(this.commonDataService.oClientConfigurationsFromJsonFile.timeoutCountDown);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  closeAllPopUpsOnTimeOut(param: string) {
    //Hide any open popups
    if (param == "reset") {
      this.commonDataService.popUpShowHide.PopUpType = "info";
      this.commonDataService.popUpShowHide.Visible = false;
      this.commonDataService.showHideErrorDialog.next(this.commonDataService.popUpShowHide);
    }

    else if (param == "timeout") {
      this.commonDataService.popUpShowHide.PopUpType = "info";
      this.commonDataService.popUpShowHide.Visible = false;
      this.commonDataService.showHideErrorDialog.next(this.commonDataService.popUpShowHide);

      this.commonDataService.popUpShowHide.PopUpType = "error";
      this.commonDataService.popUpShowHide.Visible = false;
      this.commonDataService.showHideErrorDialog.next(this.commonDataService.popUpShowHide);

      this.commonDataService.popUpShowHide.PopUpType = "video";
      this.commonDataService.popUpShowHide.Visible = false;
      this.commonDataService.showHideErrorDialog.next(this.commonDataService.popUpShowHide);
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.nav_open = false;
    this.sidebar_minimizer = false;
    this.showNavarResponsive = "mobileclosed";
  }

  LoadConfig() {

    // alert("Iam here1")
    debugger;
    this.commonMethodService.GetConfig()
      .pipe(
        tap(data => {
          //this.idleTimeOutSettings();
          //debugger;
          //alert("Iam here2")
          //this.loader.complete();
          this.commonDataService.isLoginComponent = true;
          //this.commonDataService.loggedIn.next(true);
          this.router.navigate([""]);
        })
      )
      .subscribe(
        //all after subscription works are already being done inside tap
      );
  }

  getYPosition(e): number {
    return e.target.scrollingElement.scrollTop;
  }

  SlidInOutAnim(source) {

    if (source == "usericon") {
      if (this.usericonclickanim == "open") {
        this.usericonclickanim = "close";
      }
      else {
        this.usericonclickanim = "open";
      }
    }
    else if (source == "menu1") {
      if (this.menu1iconclickanim == "open") {
        this.menu1iconclickanim = "close";
      }
      else {
        this.menu1iconclickanim = "open";
      }
    }
    else if (source == "menu2") {
      if (this.menu2iconclickanim == "open") {
        this.menu2iconclickanim = "close";
      }
      else {
        this.menu2iconclickanim = "open";
      }
    }
    else if (source == "menu3") {
      if (this.menu3iconclickanim == "open") {
        this.menu3iconclickanim = "close";
      }
      else {
        this.menu3iconclickanim = "open";
      }
    }
    else if (source == "menu4") {
      if (this.menu4iconclickanim == "open") {
        this.menu4iconclickanim = "close";
      }
      else {
        this.menu4iconclickanim = "open";
      }
    }
  }

  //Sweet alert functions- start-------------------
  SweetConfirm() {

    debugger;
    let text = "";

    text = "You session has ended. Do you want to logout?";
    this.successheader = "Delete"
    this.successmsg = "Delete successful";
    this.errormsg = "Delete cancelled"

    Swal.fire({
      title: '',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#2778c4',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {

        this.idleState = 'Timed out!';
        this.timedOut = true;

        this.reset();
        //this.closeAllPopUpsOnTimeOut("timeout");
        this.router.navigate(['']);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Do nothing// stay on the same screen
        this.reset();
      }
    })
  }

  //Sweet alert functions- end-------------------

  //Components unloads or get destroyed on browser tab close or route change
  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }
}
