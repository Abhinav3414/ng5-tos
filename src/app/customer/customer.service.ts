import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Customer } from './customer';
import { Goals } from './goals/goals';
import { Teams } from './teams/teams';
import { Address } from './addresses/address';
import { Stakeholder } from './stakeholder/stakeholder';
import { Projectrythm } from './teams/projectrythm/projectrythm';
import { Action } from './teams/action/action';
import { TeamMember } from './teams/teammember/teammember';
import { Travel } from './travel/travel';

import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {
  options: RequestOptions;

  constructor(private http:Http) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  getEmployeeData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/employees/'+id)
    .map((response:Response) => response.json()).toPromise();
  }


  getCustomerData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/customers/'+id)
    .map((response:Response) => response.json()).toPromise();
  }

  getTeamData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/teams/'+id)
    .map((response:Response) => response.json()).toPromise();
  }

  getAddressData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/addresses/'+id)
    .map((response:Response) => response.json()).toPromise();
  }

  getGoalData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/goals/'+id)
    .map((response:Response) => response.json()).toPromise();
  }

  getCustomersData():Promise<any> {
    return this.http.get('http://localhost:8080/tos/customers/')
      .map((response:Response) => response.json()).toPromise();
  }

  getStakeholderData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/stakeholders/'+id)
      .map((response:Response) => response.json()).toPromise();
  }

  getTravelData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/travels/'+id)
      .map((response:Response) => response.json()).toPromise();
  }

  getProjectRythmData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/projectrythms/'+id)
      .map((response:Response) => response.json()).toPromise();
  }

  getActionData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/actions/'+id)
      .map((response:Response) => response.json()).toPromise();
  }

  getTeamMemberData(id: number):Promise<any> {
    return this.http.get('http://localhost:8080/tos/teammembers/'+id)
      .map((response:Response) => response.json()).toPromise();
  }

  postCustomer(cust: Customer) {
    this.http.post('http://localhost:8080/tos/customers/', cust, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postGoal(goal: Goals) {
    this.http.post('http://localhost:8080/tos/goals/', goal, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postTeam(team: Teams) {
    this.http.post('http://localhost:8080/tos/teams/', team, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postTravel(travel: Travel) {
    this.http.post('http://localhost:8080/tos/travels/', travel, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postAddress(address: Address) {
    this.http.post('http://localhost:8080/tos/addresses/', address, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postStakeholder(stakeholder: Stakeholder) {
    this.http.post('http://localhost:8080/tos/stakeholders/', stakeholder, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postProjectrythm(projectrythm: Projectrythm) {
    this.http.post('http://localhost:8080/tos/projectrythms/', projectrythm, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postAction(action: Action) {
    this.http.post('http://localhost:8080/tos/actions/', action, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  postTeamMember(teammember: any) {
    this.http.post('http://localhost:8080/tos/teammembers/', teammember, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateCustomer(cust: Customer) {
    this.http.put('http://localhost:8080/tos/customers/'+ cust.id, cust, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateAddress(address: Address) {
    this.http.put('http://localhost:8080/tos/addresses/'+ address.id, address, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateGoal(goal: Goals) {
    this.http.put('http://localhost:8080/tos/goals/'+ goal.id, goal, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateTeam(team: Teams) {
    this.http.put('http://localhost:8080/tos/teams/'+ team.id, team, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateStakeholder(stakeholder: Stakeholder) {
    this.http.put('http://localhost:8080/tos/stakeholders/'+ stakeholder.id, stakeholder, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateTravel(travel: Travel) {
    this.http.put('http://localhost:8080/tos/travels/'+ travel.id, travel, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateProjectRythm(projectRythm: Projectrythm) {
    this.http.put('http://localhost:8080/tos/projectrythms/'+ projectRythm.id, projectRythm, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateAction(action: Action) {
    this.http.put('http://localhost:8080/tos/actions/'+ action.id, action, this.options)
    .subscribe((res:Response) => console.log(res));
  }

  updateTeamMember(teammember: any) {
    this.http.put('http://localhost:8080/tos/teammembers/'+ teammember.id, teammember, this.options)
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

  delelteTeam(id: number) {
    this.http.delete('http://localhost:8080/tos/teams/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteAddress(id: number) {
    this.http.delete('http://localhost:8080/tos/addresses/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteStakeholder(id: number) {
    this.http.delete('http://localhost:8080/tos/stakeholders/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteTravel(id: number) {
    this.http.delete('http://localhost:8080/tos/travels/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteProjectRythm(id: number) {
    this.http.delete('http://localhost:8080/tos/projectrythms/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteAction(id: number) {
    this.http.delete('http://localhost:8080/tos/actions/'+ id)
    .subscribe((res:Response) => console.log(res));
  }

  delelteTeamMember(id: number) {
    this.http.delete('http://localhost:8080/tos/teammembers/'+ id)
    .subscribe((res:Response) => console.log(res));
  }


}
