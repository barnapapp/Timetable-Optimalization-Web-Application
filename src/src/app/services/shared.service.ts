import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  message?: boolean;
  id_get?: string;

  constructor() { }


  setMessage(data: boolean) {
    this.message = data;
  }

  sendId() {
    this.subject.next();
  }

  getId(): Observable<any> {
    return this.subject.asObservable();
  }

  getMessage() {
    return this.message;
  }

}
