

import { BaseService } from './base.service';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class MktZoomServiceService extends BaseService {
  private static RESOURCE = '';

  constructor(public http: HttpClientModule) {
    super(http, MktZoomServiceService.RESOURCE);
  }

  getLoginInfo(entry: string, resource: string): Observable<any> {
    return this.sendObjectWithPost(entry, resource);
  }

  getContent(entry: string, resource: string): Observable<any> {
    return this.getArrayWithPost(entry, resource);
  }

  getAllMyDocuments(myentry: any, myurl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myurl);
  }

  getDocumentsByFlow(myentry: any, myurl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myurl);
  }

  getDocReview(myentry: any, myurl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myurl);
  }

  getDocumentsById(myentry: any, myurl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myurl);
  }

  getDocsToBeCompared(myentry: any, myurl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myurl);
  }

  getCampaignList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getUsersList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getResourcesList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getInitiativesList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getTypesList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getRolesList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  getAssetsList(myurl: string): Observable<Object[]> {
    return this.getArray(myurl);
  }

  createDocument(myentry: any, myUrl: string): Observable<Object[]> {
    return this.getArrayWithPost(myentry, myUrl);
  }

  // getClosingDays(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getDayCareId(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getDayCareIdentifiers(myurl: string): Observable<Object[]> {
  //   return this.getArray(myurl);
  // }

  // getEntriesForToday(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getDayCareInfo(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // CheckDupKids(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getKidImage(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // saveClosingDays(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getSupplies(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getKidComments(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getCheckInCheckOut(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // setItemPurchased(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // checkKidKey(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getKidInfo(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }
  // sendFormInfo(forminfo: any, myurl: string): Observable<Object> {
  //   return this.addObjectWithPost(forminfo, myurl);
  // }

  // addSupplies(forminfo: any, myurl: string): Observable<Object> {
  //   return this.addObject(forminfo, myurl);
  // }

  // deleteKid(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getDayCareSetup(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getVisibleMenuItems(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // addKidComments(forminfo: any, myurl: string): Observable<Object> {
  //   return this.addObject(forminfo, myurl);
  // }

  // recoverPassword(forminfo: any, myurl: string): Observable<Object> {
  //   return this.getObjectWithPost(forminfo, myurl);
  // }

  // createAccount(forminfo: any, myurl: string): Observable<Object> {
  //   return this.getObjectWithPost(forminfo, myurl);
  // }

  // getKidsEntries(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // deleteEntry(myentry: any, myurl: string): Observable<Object> {
  //   return this.getObjectWithPost(myentry, myurl);
  // }

  // deleteKidComments(myentry: any, myurl: string): Observable<Object> {
  //   return this.getObjectWithPost(myentry, myurl);
  // }

  // getUsage(myentry: any, myurl: string): Observable<Object[]> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // getKidId(myentry: any, myurl: string): Observable<Object> {
  //   return this.getArrayWithPost(myentry, myurl);
  // }

  // saveEntry(entry: string, resource: string): Observable<Object> {
  //   return this.getObjectWithPost(entry, resource);
  // }
}

