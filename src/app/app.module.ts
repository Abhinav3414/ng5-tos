import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BreadcrumbComponent } from './menu/breadcrumb.component';

import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';


import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerDialogComponent } from './customer/customer-dialog.component';

import { GoalDialogComponent } from './customer/goal/goal-dialog.component';
import { TeamDialogComponent } from './customer/team/team-dialog.component';

import { AddressDialogComponent } from './customer/addresses/address-dialog.component';

import { StakeholderDialogComponent } from './customer/stakeholder/stakeholder-dialog.component';

import { TeamViewComponent } from './customer/team/team-view.component';
import { ProjectRythmDialogComponent } from './customer/team/projectrythm/projectrythm-dialog.component';
import { TeamMemberDialogComponent } from './customer/team/teammember/teammember-dialog.component';
import { TravelDialogComponent } from './customer/travel/travel-dialog.component';
import { SkillDialogComponent } from './employee/skill/skill-dialog.component';
import { CertificationDialogComponent } from './employee/certification/certification-dialog.component';

import { ImprovementAreaDialogComponent } from './employee/improvementarea/improvementarea-dialog.component';
import { FeedbackDialogComponent } from './employee/feedback/feedback-dialog.component';
import { TrainingDialogComponent } from './employee/training/training-dialog.component';
import { ProfileComponent } from './profile/profile.component';

import { ActionDialogComponent } from './customer/team/action/action-dialog.component';

import { DataService } from './services/data.service';
import { RouterModule, Routes } from '@angular/router';

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
    TeamMemberDialogComponent,
    TravelDialogComponent,
    SkillDialogComponent,
    CertificationDialogComponent,
    TrainingDialogComponent,
    ImprovementAreaDialogComponent,
    FeedbackDialogComponent,
    ProfileComponent,
    FooterComponent,
    ContentComponent,
    BreadcrumbComponent
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
    ReactiveFormsModule
  ],
  exports: [],
  providers: [DataService
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
  ],
  entryComponents: [
    EmployeeDialogComponent, CustomerDialogComponent, AddressDialogComponent, StakeholderDialogComponent,
    GoalDialogComponent, TeamDialogComponent, ProjectRythmDialogComponent, ActionDialogComponent,
    TeamMemberDialogComponent, TravelDialogComponent, SkillDialogComponent, CertificationDialogComponent,
    TrainingDialogComponent, ImprovementAreaDialogComponent, FeedbackDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }

}
