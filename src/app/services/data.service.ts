import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { LocalStorageService } from './localStorage.service';
import { UrlService } from './url.service';

@Injectable()
export class DataService {
  token: any;
  baseResourceURL: string;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService,
    private utilityService: UtilityService, private urlService: UrlService) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

      this.baseResourceURL = this.urlService.getBaseResourceUrl();
  }

  getToken() {
    if (this.localStorageService.getValueFromLocalStorage() !== null)
      return this.token = '?access_token=' + this.localStorageService.getValueFromLocalStorage().access_token;
  }

  getEntityData(entityName: string, id: number): Promise<any> {
    return this.httpClient.get<any>(this.baseResourceURL + entityName + "/" + id + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  getEntityAllData(entityName: any): Promise<any> {
    return this.httpClient.get<any>(this.baseResourceURL + entityName + "/" + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  getUsers(): Promise<any> {
    return this.httpClient.get<any>('http://localhost:8080/tos-app/tosuser/tosadmin/users' + "/" + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  postEntity(entityName: string, entity: any) {
    return this.httpClient.post(this.baseResourceURL + entityName + "/" + this.getToken(), entity).toPromise()
      .then((response: Response) => response);
  }

  updateEntity(entityName: string, id: number, entity: any) {
    return this.httpClient.put(this.baseResourceURL + entityName + "/" + id + this.getToken(), entity).toPromise()
      .then((response: Response) => response);
  }

  delelteEntity(entityName: string, id: number) {
    return this.httpClient.delete(this.baseResourceURL + entityName + "/" + id + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  postUserEntity(entityName: string, entity: any) {
    return this.httpClient.post(this.urlService.getBaseResourceUserUrl() + entityName + "/", entity).toPromise()
      .then((response: Response) => response);
  }

}
