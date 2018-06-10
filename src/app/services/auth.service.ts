import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../token';
import { UrlService } from '../services/url.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  AccessToken: string = "";

  constructor(private http: Http, private urlService: UrlService) {
  }

  login(usercreds): Promise<Token> {
    // Authorization code is : Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0
    let headersForTokenAPI = new Headers();
    headersForTokenAPI.append("Content-Type", "application/x-www-form-urlencoded");
    headersForTokenAPI.append("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0");

    var data = "?grant_type=password&username=" + usercreds.username + "&password=" + usercreds.password;

    return this.http.post(this.urlService.getTokenApiUrl() + data, null, { headers: headersForTokenAPI })
      .map(res => {
        this.AccessToken = res.json().access_token;
        return res.json();
      }).toPromise();

  }

}
