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
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDialogComponent } from './employee/employee-dialog.component';


import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerComponent } from './customer/customer.component';
import { GoalsComponent } from './customer/goals/goals.component';
import { TeamsComponent } from './customer/teams/teams.component';
import { AddressComponent } from './customer/addresses/address.component';
import { StakeholderComponent } from './customer/stakeholder/stakeholder.component';
import { TeamViewComponent } from './customer/teams/team-view.component';
import { ProjectrythmComponent } from './customer/teams/projectrythm/projectrythm.component';
import { ActionComponent } from './customer/teams/action/action.component';

import { EmployeeService } from './employee/employee.service';
import { CustomerService } from './customer/customer.service';
import { RouterModule, Routes } from '@angular/router';

import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeMainComponent,
    AboutComponent,
    MenuComponent,
    CustomerMainComponent,
    EmployeeComponent,
    EmployeeViewComponent,
    CustomerComponent,
    CustomerViewComponent,
    GoalsComponent,
    TeamsComponent,
    AddressComponent,
    StakeholderComponent,
    TeamViewComponent,
    ProjectrythmComponent,
    ActionComponent,
    EmployeeDialogComponent
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
    MatIconModule,
    RouterModule.forRoot([
      {path:'employee-home',component: EmployeeMainComponent},
      {path:'employee/:id',component: EmployeeComponent},
      {path:'about',component: AboutComponent},
      {path:'customer-home', component: CustomerMainComponent},
      {path:'customer/:id', component: CustomerComponent},
      {path:'customer-view/:id', component: CustomerViewComponent},
      {path:'goals/:custid/:id', component: GoalsComponent},
      {path:'teams/:custid/:id', component: TeamsComponent},
      {path:'address/:custid/:id', component: AddressComponent},
      {path:'stakeholder/:custid/:id', component: StakeholderComponent},
      {path:'team-view/:id', component: TeamViewComponent},
      {path:'projectrythm/:teamid/:id', component: ProjectrythmComponent},
      {path:'action/:teamid/:id', component: ActionComponent},
      {path:'employee-view/:id', component: EmployeeViewComponent}
    ])
  ],
  exports: [  ],
  providers: [ EmployeeService, CustomerService
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
  ],
  entryComponents: [
    EmployeeDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
  //    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/materialdesignicons-webfont.svg'));
  }

 }
