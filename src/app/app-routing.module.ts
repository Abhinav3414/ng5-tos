import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeMainComponent } from './employee/employee-main.component';
import { AboutComponent } from './about/about.component';
import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { TeamViewComponent } from './customer/team/team-view.component';
import { EmployeeViewComponent } from './employee/employee-view.component';
import { ProfileComponent } from './profile/profile.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Ace5Component } from './ace5/ace5.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'view/login', component: LoginComponent },
  { path: 'view/register', component: RegisterComponent },
  { path: 'contentDashboard', component: ContentComponent },
  { path: 'view/about', component: AboutComponent },
  { path: 'view/profile', component: ProfileComponent },
  { path: 'view/customers', component: CustomerMainComponent },
  { path: 'view/customer/:id', component: CustomerViewComponent },
  { path: 'view/employees', component: EmployeeMainComponent },
  { path: 'view/employee/:id', component: EmployeeViewComponent },
  { path: 'view/team/:id', component: TeamViewComponent },
  { path: 'view/ace5/:customerId', component: Ace5Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
