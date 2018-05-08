import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { LocalStorageService } from './localStorage.service';



@Injectable()
export class UrlService {
  tokenApiUrl = '/tos-app/oauth/token';
  appBaseUrl = '/tos-app/index.html';
  baseResourceUrl = '/tos-app/tos/';
  baseResourceUserUrl = '/tos-app/tosuser/';
  propertyUrl = '/properties/uri/';  // Not used for now

  baseUrl: string;

  constructor() {
    this.baseUrl = (location.origin === 'http://localhost:4200') ? 'http://localhost:8080' : location.origin;
  }

  getTokenApiUrl() {
    return this.baseUrl + this.tokenApiUrl;
  }

  getAppBaseUrl() {
    return this.baseUrl + this.appBaseUrl;
  }

  getBaseResourceUrl() {
    return this.baseUrl + this.baseResourceUrl;
  }

  getBaseResourceUserUrl() {
    return this.baseUrl + this.baseResourceUserUrl;
  }

}
