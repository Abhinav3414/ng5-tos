import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../token';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageService {

  public setAuthorizationData(auth: Token): void {
    localStorage.setItem("Authorization", JSON.stringify(auth));
  }

  public getValueFromLocalStorage(): Token {
    let tokendate = JSON.parse(localStorage.getItem("Authorization"));
    return tokendate == null ? null : tokendate;
  }

}
