import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout'
import { RouterModule, Routes } from '@angular/router';

import { PrimeModule } from './prime.module';
import { CustomMaterialModule } from './custom-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { BreadcrumbComponent } from './menu/breadcrumb.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { EmployeeMainComponent } from './employee/employee-main.component';
import { EmployeeViewComponent } from './employee/employee-view.component';
import { EmployeeDialogComponent } from './employee/employee-dialog.component';

import { CustomerMainComponent } from './customer/customer-main.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerDialogComponent } from './customer/customer-dialog.component';

import { Ace5Component } from './ace5/ace5.component';

import { GoalDialogComponent } from './customer/goal/goal-dialog.component';
import { TeamDialogComponent } from './customer/team/team-dialog.component';
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
import { ActionDialogComponent } from './customer/team/action/action-dialog.component';

import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localStorage.service';
import { UrlService } from './services/url.service';
import { AuthInterceptor } from './Interceptors/auth.interceptor';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeMainComponent,
    AboutComponent,
    MenuComponent,
    CustomerMainComponent,
    EmployeeViewComponent,
    CustomerViewComponent,
    TeamViewComponent,
    EmployeeDialogComponent,
    CustomerDialogComponent,
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
    BreadcrumbComponent,
    HomeComponent,
    Ace5Component
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
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [],
  providers: [DataService, UtilityService, AuthService, LocalStorageService, UrlService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy },*/
  ],
  entryComponents: [
    EmployeeDialogComponent, CustomerDialogComponent, StakeholderDialogComponent,
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
