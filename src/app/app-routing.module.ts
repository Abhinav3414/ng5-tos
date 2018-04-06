import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeMainComponent } from './employee/employee-main.component';
import { AboutComponent } from './about/about.component';
import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { TeamViewComponent } from './customer/team/team-view.component';
import { EmployeeViewComponent } from './employee/employee-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'employee-main', component: EmployeeMainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'customer-main', component: CustomerMainComponent },
  { path: 'customer-view/:id', component: CustomerViewComponent },
  { path: 'team-view/:id', component: TeamViewComponent },
  { path: 'employee-view/:id', component: EmployeeViewComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
