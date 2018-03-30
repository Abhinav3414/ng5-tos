import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { PrimeModule } from './prime.module';
import { CustomMaterialModule } from './custom-material.module';

import { EmployeeMainComponent } from './employee/employee-main.component';
import { EmployeeViewComponent } from './employee/employee-view.component';
import { EmployeeDialogComponent } from './employee/employee-dialog.component';

import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerDialogComponent } from './customer/customer-dialog.component';

import { GoalDialogComponent } from './customer/goals/goal-dialog.component';
import { TeamDialogComponent } from './customer/teams/team-dialog.component';

import { AddressDialogComponent } from './customer/addresses/address-dialog.component';

import { StakeholderDialogComponent } from './customer/stakeholder/stakeholder-dialog.component';

import { TeamViewComponent } from './customer/teams/team-view.component';
import { ProjectRythmDialogComponent } from './customer/teams/projectrythm/projectrythm-dialog.component';
import { TeamMemberDialogComponent } from './customer/teams/teammember/teammember-dialog.component';

import { ActionDialogComponent } from './customer/teams/action/action-dialog.component';

import { EmployeeService } from './employee/employee.service';
import { CustomerService } from './customer/customer.service';
import { RouterModule, Routes } from '@angular/router';


import {DomSanitizer} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeMainComponent,
    AboutComponent,
    MenuComponent,
    CustomerMainComponent,
    EmployeeViewComponent,
    CustomerViewComponent,
    TeamViewComponent,
    EmployeeDialogComponent,
    CustomerDialogComponent,
    AddressDialogComponent,
    StakeholderDialogComponent,
    GoalDialogComponent,
    TeamDialogComponent,
    ProjectRythmDialogComponent,
    ActionDialogComponent,
    TeamMemberDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'employee-home',component: EmployeeMainComponent},
      {path:'about',component: AboutComponent},
      {path:'customer-home', component: CustomerMainComponent},
      {path:'customer-view/:id', component: CustomerViewComponent},
      {path:'team-view/:id', component: TeamViewComponent},
      {path:'employee-view/:id', component: EmployeeViewComponent}
    ])
  ],
  exports: [  ],
  providers: [ EmployeeService, CustomerService
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
  ],
  entryComponents: [
    EmployeeDialogComponent, CustomerDialogComponent, AddressDialogComponent, StakeholderDialogComponent,
    GoalDialogComponent, TeamDialogComponent, ProjectRythmDialogComponent, ActionDialogComponent,
    TeamMemberDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){
  }

 }
