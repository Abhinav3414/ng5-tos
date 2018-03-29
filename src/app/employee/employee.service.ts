import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
    options: RequestOptions;

    constructor(private http: Http) {
        let headers: any = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });
    }

    getEmployeeData(id: number): Promise<any> {
        return this.http.get('http://localhost:8080/tos/employees/' + id)
            .map((response: Response) => response.json()).toPromise();
    }

    getEmployeesData() {
        return this.http.get('http://localhost:8080/tos/employees/')
            .map((response: Response) => response.json());
    }

    postEmployee(emp: Employee) {
        this.http.post('http://localhost:8080/tos/employees/', emp, this.options)
            .subscribe((res: Response) => console.log(res));
    }

    updateEmployee(emp: Employee) {
        this.http.put('http://localhost:8080/tos/employees/' + emp.id, emp, this.options)
            .subscribe((res: Response) => console.log(res));

    }

    delelteEmployee(id: number) {
        return this.http.delete('http://localhost:8080/tos/employees/' + id)
            .subscribe((res: Response) => console.log(res));
    }

    /*
      getEmployeesData() {
        this.httpClient.get('https://raw.githubusercontent.com/techsithgit/json-faker-directory/master/db.json', {responseType: 'json'})
        .subscribe(
          (data:any[]) => this.employees = data;
          return this.employees;
        )
      }
    */


}
