import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  getEntityData(entityName: string, id: number): Promise<any> {
    return this.httpClient.get<any>('http://localhost:8080/tos/' + entityName + "/" + id).toPromise()
      .then((response: Response) => response);
  }

  getEntityAllData(entityName: any): Promise<any> {
    return this.httpClient.get<any>('http://localhost:8080/tos/' + entityName + "/").toPromise()
      .then((response: Response) => response);
  }

  postEntity(entityName: string, entity: any) {
    return this.httpClient.post('http://localhost:8080/tos/' + entityName + "/", entity).toPromise()
      .then((response: Response) => response);
  }

  updateEntity(entityName: string, id: number, entity: any) {
    return this.httpClient.put('http://localhost:8080/tos/' + entityName + "/" + id, entity).toPromise()
      .then((response: Response) => response);
  }

  delelteEntity(entityName: string, id: number) {
    return this.httpClient.delete('http://localhost:8080/tos/' + entityName + "/" + id).toPromise()
      .then((response: Response) => response);
  }

}
