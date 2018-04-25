import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class DataService {
  token: any;

  constructor(private authService: AuthService, private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

      this.token = '?access_token=' + this.localStorageService.getValueFromLocalStorage().access_token
  }

  getEntityData(entityName: string, id: number): Promise<any> {
    return this.httpClient.get<any>('http://localhost:8080/tos/' + entityName + "/" + id + this.token).toPromise()
      .then((response: Response) => response);
  }

  getEntityAllData(entityName: any): Promise<any> {
    return this.httpClient.get<any>('http://localhost:8080/tos/' + entityName + "/" + this.token).toPromise()
      .then((response: Response) => response);
  }

  postEntity(entityName: string, entity: any) {
    return this.httpClient.post('http://localhost:8080/tos/' + entityName + "/" + this.token , entity ).toPromise()
      .then((response: Response) => response);
  }

  updateEntity(entityName: string, id: number, entity: any) {
    return this.httpClient.put('http://localhost:8080/tos/' + entityName + "/" + id + this.token , entity).toPromise()
      .then((response: Response) => response);
  }

  delelteEntity(entityName: string, id: number) {
    return this.httpClient.delete('http://localhost:8080/tos/' + entityName + "/" + id + this.token).toPromise()
      .then((response: Response) => response);
  }

}
