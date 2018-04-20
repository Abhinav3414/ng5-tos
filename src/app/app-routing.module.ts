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
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contentDashboard', component: ContentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'customer-main', component: CustomerMainComponent },
  { path: 'customer-view/:id', component: CustomerViewComponent },
  { path: 'employee-main', component: EmployeeMainComponent },
  { path: 'employee-view/:id', component: EmployeeViewComponent },
  { path: 'team-view/:id', component: TeamViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
