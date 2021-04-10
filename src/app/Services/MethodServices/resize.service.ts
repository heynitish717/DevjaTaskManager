import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, EMPTY, throwError, Subject } from "rxjs";
import { catchError, map, tap, concatMap, distinctUntilChanged } from "rxjs/operators";
import { SCREEN_SIZE } from "src/app/Models/index";

@Injectable({
  providedIn: "root",
})

export class ResizeService {

  private resizeSubject: Subject<SCREEN_SIZE>;

  constructor() {
    this.resizeSubject = new Subject();
  }

  get onResize$(): Observable<SCREEN_SIZE> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  onResize(size: SCREEN_SIZE) {
    this.resizeSubject.next(size);
  }

}