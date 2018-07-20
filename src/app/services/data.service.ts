import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject<any>([]);
  currentMessage = this.messageSource.asObservable();
  private documentid = new BehaviorSubject<number>(0);
  currentdocumentid = this.documentid.asObservable();
  private loggedIn = new BehaviorSubject<boolean>(false);
  currentisloggedin = this.loggedIn.asObservable();
  private doctocompare = new BehaviorSubject<any>([]);
  currentreview = this.doctocompare.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  changeMessageDocId(docmessage: any) {
    this.documentid.next(docmessage);
  }

  changeMessageIsLoggedIn(userlogged: any) {
    this.loggedIn.next(userlogged);
  }

  changeDocCompare(doccomparado: any) {
    this.doctocompare.next(doccomparado);
  }

  constructor() { }
}
