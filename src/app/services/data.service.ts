import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { LocalStorageService } from './localStorage.service';



@Injectable()
export class DataService {
  token: any;
  baseResourceURL: string;
  PropUris = undefined;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService,
    private utilityService: UtilityService) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

      this.getPropertyUris();
      let PropertyUris = JSON.parse(localStorage.getItem("PropertyUris"));
      if(PropertyUris !== null) {
          this.baseResourceURL = PropertyUris.baseResourceUrl;
      }
  }

  getToken() {
    if(this.localStorageService.getValueFromLocalStorage() !== null)
      return this.token = '?access_token=' + this.localStorageService.getValueFromLocalStorage().access_token;
    }

    getPropertyUris(): Promise<any> {
      var propertyUriUrl;
      if(location.origin === 'http://localhost:4200') {
        propertyUriUrl = 'http://localhost:8080'
      }
      else {
        propertyUriUrl = location.origin;
      }
      return this.httpClient.get<any>( propertyUriUrl + '/tos-app/properties/uri').toPromise()
        .then((response: Response) => {
          localStorage.setItem("PropertyUris", JSON.stringify(response));
          this.PropUris = JSON.stringify(response);
        });
    }

  getEntityData(entityName: string, id: number): Promise<any> {
    return this.httpClient.get<any>(this.baseResourceURL + entityName + "/" + id + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  getEntityAllData(entityName: any): Promise<any> {
    return this.httpClient.get<any>(this.baseResourceURL + entityName + "/" + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  postEntity(entityName: string, entity: any) {
    return this.httpClient.post(this.baseResourceURL + entityName + "/" + this.getToken() , entity ).toPromise()
      .then((response: Response) => response);
  }

  updateEntity(entityName: string, id: number, entity: any) {
    return this.httpClient.put(this.baseResourceURL + entityName + "/" + id + this.getToken() , entity).toPromise()
      .then((response: Response) => response);
  }

  delelteEntity(entityName: string, id: number) {
    return this.httpClient.delete(this.baseResourceURL + entityName + "/" + id + this.getToken()).toPromise()
      .then((response: Response) => response);
  }

  postUserEntity(entityName: string, entity: any) {
    let PropertyUris = JSON.parse(localStorage.getItem("PropertyUris"));
    return this.httpClient.post(PropertyUris.baseResourceUserUrl + entityName + "/", entity ).toPromise()
      .then((response: Response) => console.log(response));
  }

}
