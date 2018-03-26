import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Customer } from './customer';
import { Goals } from './goals/goals';

@Injectable()
export class CustomerService {
  options: RequestOptions;

  constructor(private http:Http) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  getCustomerData(id: number) {
    return this.http.get('http://localhost:8080/tos/customers/'+id)
    .map((response:Response) => response.json());
  }

  getCustomersData() {
    return this.http.get('http://localhost:8080/tos/customers/')
      .map((response:Response) => response.json());
  }

  postCustomer(cust: Customer) {
    this.http.post('http://localhost:8080/tos/customers/', cust, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postGoal(goal: Goals) {
    this.http.post('http://localhost:8080/tos/goals/', goal, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateCustomer(cust: Customer) {
    console.log(cust)
    this.http.put('http://localhost:8080/tos/customers/'+ cust.id, cust, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  delelteCustomer(id: number) {
      return this.http.delete('http://localhost:8080/tos/customers/'+ id)
      .subscribe((res:Response) => console.log(res));
  }

  delelteGoal(id: number) {
    this.http.delete('http://localhost:8080/tos/goals/'+ id)
    .subscribe((res:Response) => console.log(res));
  }


}
