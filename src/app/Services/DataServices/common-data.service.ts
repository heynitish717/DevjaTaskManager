import { ElementRef, Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import {
  ConfigModel,
  ErrorMsg,
  PopUpShowHide
} from "src/app/Models/index";

class inputemit {
  data: number;
  type: string;

  constructor() {
    this.data = 0;
    this.type = "";
  }
}

@Injectable()
export class CommonDataService {
  counter: number = 0;
  authenticationMode: string = "";
  loginId: string = "";
  isTokenRequest: boolean = false;
  headers: {} = null;
  oClientConfigurationsFromJsonFile: ConfigModel = null;
  isLoggedOut: boolean = true;
  isLoginComponent: boolean;
  loggedIn: Subject<boolean> = new Subject<boolean>();
  serverResponseCode: number;
  activeErrorModal: any;
  themeBtnSelected: Subject<HTMLElement> = new Subject<HTMLElement>();
  private logout = new Subject<number>();
  islangScreenTextLoded: boolean = false;
  tokenInfo: any;
  userPermission: any;

  selectedLangCode: string;
  visitorType: string;
  isVisitorExisting: boolean;
  departmentList: any;
  emplyeeList: any;
  objectPictureURL: any;
  selectedLangOnScreen: Subject<string> = new Subject<string>();
  allLangLoaded: Subject<boolean> = new Subject<boolean>();
  langDirectionDecider: string = "";
  loadedLanguages: string[] = [];
  isPageReloaded: Subject<boolean> = new Subject<boolean>();
  langChanged: Subject<boolean> = new Subject<boolean>();
  sysHealthNetwork: boolean = true;
  sysHealthApi: boolean = true;
  loader: any;
  errorMsg: ErrorMsg = new ErrorMsg();
  //hide home icon in header on whichever page required
  isHomeIconVisible: boolean = true;
  isInfoIconVisible: boolean = true;
  isBackIconVisible: boolean = true;
  activeUrl: string = "/display/dashboard";
  changeScreenDirection: Subject<boolean> = new Subject<boolean>();

  //Dialog box show/hide flags
  displayInfoDialog: boolean;
  displayErrorDialog: boolean;
  displayVideoDialog: boolean;
  showHideErrorDialog: Subject<PopUpShowHide> = new Subject<PopUpShowHide>();
  popUpShowHide: PopUpShowHide = new PopUpShowHide();

  passParentInputRefToChild: Subject<ElementRef> = new Subject<ElementRef>();

  cursorPosition: Subject<inputemit> = new Subject<inputemit>();

  maxdevicereadattempts: number;
  isOperatorValue: boolean;
  isOperator: Subject<boolean> = new Subject<boolean>();
  isLocCatUpdated: Subject<boolean> = new Subject<boolean>();
  toggleMenu: Subject<string> = new Subject<string>();
  barIconClickAnim: string = "Open";

  //Global drop down lists
  glLocationList: any[] = [];
  glVisitorCategoryList: any[] = [];
  glEmployeeList: any[] = [];
  glIDTypeList: any[] = [];
  glPurposeOfVisitList: any[] = [];
  glDepartmentList: any[] = [];
  glRoleList: any[] = [];
  glHierarchyList: any[] = [];
  glLanguageList: any[] = [];


  //Mtm Display
  updateTask: Subject<any> = new Subject<any>();
  viewTask: Subject<any> = new Subject<any>();
  redirectorPage: string;
  itemToUpdateOrView: any;
  userList: any[];
  priorityList: any[];
  taskList: any[];
  isNewTaskAdded: Subject<boolean> = new Subject<boolean>();
  isTaskListReloaded: Subject<boolean> = new Subject<boolean>();

  //selectedLangOnScreen
  setScreenLang(langcode: string) {

    this.selectedLangOnScreen.next(langcode);
  }

  clearScreenLang() {
    this.selectedLangOnScreen.next("");
  }

  getScreenLang(): Observable<any> {
    return this.selectedLangOnScreen.asObservable();
  }

  setLogout(status: number) {
    this.logout.next(status);
  }

  clearLogout() {
  }

  getLogout(): Observable<any> {
    return this.logout.asObservable();
  }

  showCompLandingPageList: boolean = true;
  showSideBar: boolean = true;

  Reset() {
    this.isVisitorExisting = false;
    this.allLangLoaded = new Subject<boolean>();
    this.loadedLanguages = [];
    this.sysHealthApi = true;
    this.errorMsg = new ErrorMsg();
    this.isLoginComponent = true;
    //hide home icon in header on whichever page required
  }
}
