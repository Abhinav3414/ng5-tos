import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PrimeModule } from './prime.module';
import { EmployeeMainComponent } from './employee/employee-main.component';
import { EmployeeComponent } from './employee/employee.component';

import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerComponent } from './customer/customer.component';
import { GoalsComponent } from './customer/goals/goals.component';


import { EmployeeService } from './employee/employee.service';
import { CustomerService } from './customer/customer.service';

import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeMainComponent,
    AboutComponent,
    MenuComponent,
    CustomerMainComponent,
    EmployeeComponent,
    CustomerComponent,
    CustomerViewComponent,
    GoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'employee-home',component: EmployeeMainComponent},
      {path:'employee/:id',component: EmployeeComponent},
      {path:'about',component: AboutComponent},
      {path:'customer-home', component: CustomerMainComponent},
      {path:'customer/:id', component: CustomerComponent},
      {path:'customer-view/:id', component: CustomerViewComponent},
      {path:'goals/:custid/:id', component: GoalsComponent}
    ])
  ],
  exports: [
    PrimeModule
  ],
  providers: [ EmployeeService, CustomerService
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
