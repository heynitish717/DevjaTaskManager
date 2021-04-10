import { Injectable } from "@angular/core";
import { CommonDataService } from "src/app/Services/DataServices/common-data.service";
import { MessageService } from "primeng/api";
import { Observable, Subject } from 'rxjs';
import { MessagePayload } from '../../Models/index';

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  counter = 0;
  private messageNotification = new Subject<MessagePayload>();

  public messagePayload: MessagePayload;
  constructor(
    private commonDataService: CommonDataService,
    private primeNgMessageService: MessageService,
  ) {
  }

  sendMessage(message: MessagePayload) {
    this.messageNotification.next(message);
  }

  clearMessages() {
    this.messageNotification.next();
  }

  getMessage(): Observable<any> {
    return this.messageNotification.asObservable();
  }

  ////Severity Guide////
  //success
  //info
  //warn
  //error

  //Error message position guide
  //tl - top left
  //tc  top center
  //c - center
  //default - right

  CommonErrorHandler(responseErrorCode: number, error: any) {
    debugger;
    this.messagePayload = new MessagePayload();
    switch (responseErrorCode) {
      case 0: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        this.messagePayload.detail = "Server Connectivity Issue.";
        break;

      }
      case 404: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        this.messagePayload.detail = "Oops! Api Not Found.";
        break;
        //Redirect to page not found route
      }
      case 500: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        this.messagePayload.detail = "Internal Server Error";
        break;
      }
      case 1022: {
        this.messagePayload.severity = "warn";
        this.messagePayload.summary = "Warning Message";
        this.messagePayload.detail = "";
        break;
      }
      case 1036: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        this.messagePayload.detail = "Invalid username and password";
        break;
      }
      case 1044: {
        this.messagePayload.severity = "warn";
        this.messagePayload.summary = "Warning Message";
        this.messagePayload.detail = "";
        break;
      }
      case -2: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        //this.messagePayload.detail = error.Message;
        break;
      }
      default: {
        this.messagePayload.severity = "error";
        this.messagePayload.summary = "Error Message";
        this.messagePayload.detail = error.error.message;
        break;
      }
    }

    //Developer console log

    debugger;
    this.sendMessage(this.messagePayload);
  }

  FormErrorHandler(responseErrorCode: number, error: any) {
    //Loop over each error field in error object and set validity corresponding field in activeErrorModal to false
    this.commonDataService.activeErrorModal = "";

    Object.keys(this.commonDataService.activeErrorModal).forEach(function (
      erroModalKey,
      index
    ) {
      if (error.hasOwnProperty(erroModalKey) === true) {
        Object.keys(error[erroModalKey]).forEach(function (
          serverErrorKey,
          index
        ) {
          if (!error[erroModalKey][serverErrorKey]["IsValid"]) {
            this.commonDataService.activeErrorModal[erroModalKey][
              serverErrorKey
            ]["IsValid"] = false;
          }
        });
      }
    });
  }

  CommonSuccessMessage(message: string) {
    this.messagePayload = new MessagePayload();
    this.messagePayload.severity = "success";
    this.messagePayload.summary = "Success Message";
    this.messagePayload.detail = message;

    this.sendMessage(this.messagePayload);
  }

  CommonInfoMessage(header: string, message: string) {
    this.messagePayload = new MessagePayload();
    this.messagePayload.severity = "info";
    this.messagePayload.summary = header;
    this.messagePayload.detail = message;

    this.sendMessage(this.messagePayload);
  }

  CommonErrorMessage(header: string, message: string) {
    this.messagePayload = new MessagePayload();
    this.messagePayload.severity = "error";
    this.messagePayload.summary = header;
    this.messagePayload.detail = message;

    this.sendMessage(this.messagePayload);
  }

  CommonVideoMessage(header: string, message: string) {
    this.messagePayload = new MessagePayload();
    this.messagePayload.severity = "video";
    this.messagePayload.summary = header;
    this.messagePayload.detail = message;

    this.sendMessage(this.messagePayload);
  }

  showConfirm() {
    this.messagePayload = new MessagePayload();
    this.messagePayload.key = "c";
    this.messagePayload.sticky = true;
    this.messagePayload.severity = "warn";

    this.sendMessage(this.messagePayload);
  }

  onConfirm() {
    this.primeNgMessageService.clear('c');
  }

  onReject() {
    this.primeNgMessageService.clear('c');
  }

  clear() {
    this.primeNgMessageService.clear();
  }
}
