import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { CommonDataService, MessagingService, CommonMethodService } from "../../../Services/index";
import { ConfirmationService } from 'primeng/api';
declare var $;

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfirmationService],
  animations: [
    trigger('usericonclickanim', [
      state('open', style({
        height: '*',
        position: 'absolute',
        top: '72px',
        background: 'white',
        left: '0px',
        overflow: 'hidden',
        zIndex: '1000'
      })),
      state('close', style({
        height: '0px',
        position: 'absolute',
        top: '72px',
        background: 'white',
        left: '0px',
        overflow: 'hidden'
      })),
      transition('open <=> close', [
        animate('0.1s')
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  //component specific variables- start
  password: string;
  confirmPassword: string;
  isInfoModal: boolean;
  usericonclickanim: string;
  position: string;

  constructor(private location: Location, private router: Router,
    public commonDataService: CommonDataService,
    public notificationService: MessagingService,
    private confirmationService: ConfirmationService,
    private commonMethodService: CommonMethodService) {

  }

  ngOnInit() {
    this.isInfoModal = false;
    this.usericonclickanim = "close";
    this.position = "center";
  }

  confirmPosition() {

    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      header: 'Please Confirm',
      icon: 'pi pi-info-circle',
      accept: () => {
        localStorage.clear();
        this.router.navigate([""]);
      },
      reject: (type) => {

      },
      key: "positionDialog"
    });
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
  }

  //Crud functions- end-------------------

  ToggleMenuMobile() {

    this.commonDataService.toggleMenu.next("mobile");
  }

  ToggleMenuDesktop() {

    this.commonDataService.toggleMenu.next("desktop");
  }

  Logout() {
    this.confirmPosition();
  }
}
