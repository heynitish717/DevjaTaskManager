import { Component, OnInit, OnDestroy, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, of, interval, Subscription } from "rxjs";
import { takeUntil, concatMap, mergeMap, switchMap, exhaustMap, map, tap, catchError } from "rxjs/operators";
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CommonDataService, CommonMethodService, MessagingService, ResizeService } from "../../../Services/index";
import { ErrorMessageGroup, SCREEN_SIZE } from '../../../Models/index';
import { IDeactivateComponent } from '../../../Services/GuardServices/RouteDeactivate/deactivate-guard.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-size-detector',
  templateUrl: './size-detector-component.component.html',
  styleUrls: ['./size-detector-component.component.css']
})
export class SizeDetectorComponent implements AfterViewInit {
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs', css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm', css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md', css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg', css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl', css: `d-none d-xl-block`
    },
  ];

  constructor(private elementRef: ElementRef, private resizeSvc: ResizeService) { }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const currentSize = this.sizes.find(x => {
      // get the HTML element
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);

      // check its display property value
      const isVisible = window.getComputedStyle(el).display != 'none';

      return isVisible;
    });

    //console.log("Current Size = " + currentSize.id);
    this.resizeSvc.onResize(currentSize.id);
  }
}