import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../token';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  AccessToken: string = "";
  isAuthenticated: boolean = false;
  tokenApiURL: string;
  propertyUris: any;

  constructor(private http: Http) {
    this.propertyUris = JSON.parse(localStorage.getItem("PropertyUris"));
  }

  login(usercreds): Promise<Token> {
    this.propertyUris = JSON.parse(localStorage.getItem("PropertyUris"));
    if(this.propertyUris !== null) {
        this.tokenApiURL = this.propertyUris.tokenApiUrl;
    }
    // Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0
    let headersForTokenAPI = new Headers();
    headersForTokenAPI.append("Content-Type", "application/x-www-form-urlencoded");
    headersForTokenAPI.append("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0");
    var data = "?grant_type=password&username=" + usercreds.username + "&password=" + usercreds.password;
    return this.http.post(this.tokenApiURL + data, null, { headers: headersForTokenAPI })
      .map(res => {
        this.AccessToken = res.json().access_token;
        return res.json();
      }).toPromise();

  }

}
