import { Data } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export class BaseService {

  private httpHeaders = new Headers({ 'Content-Type': 'application/json' });
  private httpOptions = new RequestOptions({ headers: this.httpHeaders });
  public isAdminUser = 0;
  constructor(
    public http?: HttpClientModule,
    public resource?: string,
    public API_PATH: string = 'https://goemobile.com/mzoom/php/',
  ) { }

  protected getArrayWithPost(userEntry: string, resource: string) {
    return this.http.post(this.API_PATH + resource, userEntry)
      .pipe(
        map(data => {
          return data.json();
        }
      ));
  }
  protected getArrayWithGet(userEntry: string, resource: string) {
    return this.http.get(this.API_PATH + resource, userEntry)
      .pipe(
        map(data => {
          return data.json();
        }
      ));
  }

  protected getArray(resourcePath: string = '') {
    return this.http.get(this.API_PATH + this.resource + resourcePath)
      .pipe(
        map(data => {
          return data.json();
        }
      ));
  }

  protected sendObjectWithPost(userEntry: string, resource: string) {
    return this.http.post(this.API_PATH + resource, userEntry)
      .pipe(
      map(data => {
        return data.json();
      }
      ));
  }

  protected extractDataArray(res: Response) {
    const body = res;
    return body || [];
  }

  protected extractDataObject(res: Response) {
    const body = res.json().result;
    return body || {};
  }

  protected extractDataObjectWithResult(res: Response) {
    const body = res.json().result;
    return body || {};
  }

  protected handleError(error: any): Promise<any> {
    console.error('Err' + error);
    return Promise.reject(error.message || error);
  }

}
