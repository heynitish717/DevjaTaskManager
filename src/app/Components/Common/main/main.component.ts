import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Observable, Subject, Subscription, interval } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import { CommonDataService, MessagingService, CommonMethodService } from "../../../Services/index";
import { MessageService } from 'primeng/api';//Toast
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MessagePayload, PopUpShowHide } from "src/app/Models/index";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService]
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  //loader = this.loadingBar.useRef('router');
  loaderEndSubscription: Subscription;

  isLoginCompLoaded: boolean;
  isLoggedOut: boolean = false;
  loadLogOutConfirm: boolean = false;
  dialog: MessagePayload;
  infoVideo: string;

  @ViewChild("videoInfo")
  videoInfo: ElementRef;

  constructor(private router: Router,
    public commonDataService: CommonDataService,
    public commonMethodService: CommonMethodService,
    private primeNgMessageService: MessageService,
    public notificationService: MessagingService,
    private loadingBar: LoadingBarService,
  ) {

    this.commonDataService.showHideErrorDialog.subscribe((show: PopUpShowHide) => {

      if (show.PopUpType == "error") {
        if (show.Visible) {
          this.commonDataService.displayErrorDialog = true;
        }
        else {
          this.commonDataService.displayErrorDialog = false;
        }
      }
      else if (show.PopUpType == "info") {
        if (show.Visible) {
          this.commonDataService.displayInfoDialog = true;
        }
        else {
          this.commonDataService.displayInfoDialog = false;
        }
      }
      else if (show.PopUpType == "video") {
        if (show.Visible) {
          this.commonDataService.displayVideoDialog = true;
        }
        else {
          this.commonDataService.displayVideoDialog = false;
        }
      }
    });

    // router.events.pipe(takeUntil(this.onDestroy)).subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     //alert("Iam here3")
    //     if (e.url == "/display/welcome") {
    //     }
    //   }
    // });

    this.notificationService.getMessage()
      // .pipe(takeUntil(this.onDestroy))
      .subscribe((message: MessagePayload) => {
        debugger;
        this.dialog = message;
        if (message.severity == "error") {
          this.primeNgMessageService.add({ severity: message.severity, summary: message.summary, detail: message.detail });

          //this.commonDataService.displayErrorDialog = true;
          // this.commonDataService.displayInfoDialog = false;
          // this.commonDataService.displayVideoDialog = false;
        }
        else if (message.severity == "info") {
          //this.commonDataService.displayErrorDialog = false;
          this.commonDataService.displayInfoDialog = true;
          //this.commonDataService.displayVideoDialog = false;
        }
        else if (message.severity == "video") {
          // this.commonDataService.displayErrorDialog = false;
          // this.commonDataService.displayInfoDialog = false;
          this.commonDataService.displayVideoDialog = true;
          this.videoInfo.nativeElement.load();
        }
      });
  }

  ngOnInit() {

    this.commonDataService.displayErrorDialog = false;
    this.commonDataService.displayInfoDialog = false;
    this.commonDataService.displayVideoDialog = false;
    //this.commonDataService.loader = this.loadingBar.useRef('router');
    //this.commonDataService.loader.start();
  }

  //Components unloads or get destroyed on browser tab close or route change
  ngOnDestroy() {
    //Memory leakage safety coz of abandoned subscribers using single point unscubscribe for all subscriptions
    this.onDestroy.next();
  }

  //Check if there is any unsaved data. If yes then ask for confirmation before route deactivation
  canExit(): boolean {

    if (confirm("Are you sure? You unsaved changes will be lost.")) {
      return true;
    } else {
      return false
    }
  }
}
