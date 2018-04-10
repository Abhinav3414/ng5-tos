import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BreadCrumb } from '../menu/breadCrumb';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  options: RequestOptions;

  /* BehaviorSubject logic for breadCrumb */
  private breadCrumbSource = new BehaviorSubject<BreadCrumb>(new BreadCrumb());
  currentBreadCrumb = this.breadCrumbSource.asObservable();

  constructor(private http: Http) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  changeMessage(breadcrumb: BreadCrumb) {
    this.breadCrumbSource.next(breadcrumb)
  }

  getEntityData(entityName: string, id: number): Promise<any> {
    return this.http.get('http://localhost:8080/tos/' + entityName + "/" + id)
      .map((response: Response) => response.json()).toPromise();
  }

  getEntityAllData(entityName: any): Promise<any> {
    return this.http.get('http://localhost:8080/tos/' + entityName + "/")
      .map((response: Response) => response.json()).toPromise();
  }

  postEntity(entityName: string, entity: any) {
    return this.http.post('http://localhost:8080/tos/' + entityName + "/", entity, this.options)
      .map((response: Response) => response.json()).toPromise();
  }

  updateEntity(entityName: string, id: number, entity: any) {
    return this.http.put('http://localhost:8080/tos/' + entityName + "/" + id, entity, this.options)
      .map((response: Response) => response).toPromise();
  }

  delelteEntity(entityName: string, id: number) {
    return this.http.delete('http://localhost:8080/tos/' + entityName + "/" + id)
      .map((response: Response) => response).toPromise();
  }

}
