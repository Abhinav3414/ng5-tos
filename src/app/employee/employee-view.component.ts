import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { Employee } from './employee';
import { EmployeeDialogComponent } from './employee-dialog.component';
import { SkillDialogComponent } from './skill/skill-dialog.component';
import { CertificationDialogComponent } from './certification/certification-dialog.component';
import { TrainingDialogComponent } from './training/training-dialog.component';
import { FeedbackDialogComponent } from './feedback/feedback-dialog.component';
import { ImprovementAreaDialogComponent } from './improvementarea/improvementarea-dialog.component';

import { Skill } from './skill/skill';
import { ImprovementArea } from './improvementarea/improvementarea';
import { Feedback } from './feedback/feedback';
import { Certification } from './certification/certification';
import { Training } from './training/training';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'employee-view',
  templateUrl: './employee-view.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class EmployeeViewComponent {

  panelOpenState: any;
  id: number;

  employee: Employee;
  employeeSkills = [];
  employeeCertifications = [];
  employeeTrainings = [];
  employeeFeedbacks = [];
  employeeImprovementAreas = [];
  employeeTeamMembers = [];

  employeeSkill = new Skill();
  employeeCertification = new Certification();
  employeeTraining = new Training();
  employeeFeedback = new Feedback();
  employeeImprovementArea = new ImprovementArea();

  skillRatings = ['1', '2', '3', '4', '5'];
  trainingModes = ['online', 'On-site', 'Live On-Line', 'On Demand', 'Classroom'];

  certificationYearOfCertification = [];
  certificationCurrentYear: number;

  teams = [];
  Arr = Array; //Array type captured in a variable

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {

    var date = new Date();
    this.certificationCurrentYear = date.getFullYear();
    var startYear = this.certificationCurrentYear - 25;

    for (let i = this.certificationCurrentYear; i >= startYear; i--) {
      this.certificationYearOfCertification.push(i.toString());
    }

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.dataService.getEntityData('employees', this.id)
          .then((resemployeeData) => {
            this.employee = resemployeeData;

            this.employee.skills.forEach(e => this.employeeSkills.push(e));
            this.employee.certifications.forEach(e => this.employeeCertifications.push(e));
            this.employee.trainings.forEach(e => this.employeeTrainings.push(e));
            this.employee.feedbacks.forEach(e => this.employeeFeedbacks.push(e));
            this.employee.improvementAreas.forEach(e => this.employeeImprovementAreas.push(e));
            this.employee.teamMembers.forEach(e => this.employeeTeamMembers.push(e));
          })
          .then(() => {
            for (let i = 0; i < this.employeeTeamMembers.length; i++) {
              this.dataService.getEntityData('teams', this.employeeTeamMembers[i].team_Id)
                .then((resCustomerData) => {
                  this.teams[i] = resCustomerData;
                });
            }
          });
      }
    });
  }

  openDialog(entityName): void {
    if (entityName === 'skills') {
      this.employeeSkill = new Skill();
      this.openEntityDialog(SkillDialogComponent, entityName, this.employeeSkills);
    }
    else if (entityName === 'certifications') {
      this.employeeCertification = new Certification();
      this.openEntityDialog(CertificationDialogComponent, entityName, this.employeeCertifications);
    }
    else if (entityName === 'trainings') {
      this.employeeTraining = new Training();
      this.openEntityDialog(TrainingDialogComponent, entityName, this.employeeTrainings);
    }
    else if (entityName === 'feedbacks') {
      this.employeeFeedback = new Feedback();
      this.openEntityDialog(FeedbackDialogComponent, entityName, this.employeeFeedbacks);
    }
    else if (entityName === 'improvementareas') {
      this.employeeImprovementArea = new ImprovementArea();
      this.openEntityDialog(ImprovementAreaDialogComponent, entityName, this.employeeImprovementAreas);
    }
    else {
      console.log(entityName + " not found");
    }
  }

  openEntityDialog(dialogComponent, entityName, entityArray) {
    let dialogRef = this.dialog.open(dialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity(entityName, result, entityArray);
      }
    });
  }

  addNewEntity(entityName, entity, entityArray) {
    entity.employeeId = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(entityName: String, id: number): void {
    if (entityName === 'skills') {
      this.employeeSkill = this.employeeSkills[this.employeeSkills.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, SkillDialogComponent, id, this.employeeSkills);
    }
    else if (entityName === 'certifications') {
      this.employeeCertification = this.employeeCertifications[this.employeeCertifications.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, CertificationDialogComponent, id, this.employeeCertifications);
    }
    else if (entityName === 'trainings') {
      this.employeeTraining = this.employeeTrainings[this.employeeTrainings.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, TrainingDialogComponent, id, this.employeeTrainings);
    }
    else if (entityName === 'feedbacks') {
      this.employeeFeedback = this.employeeFeedbacks[this.employeeFeedbacks.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, FeedbackDialogComponent, id, this.employeeFeedbacks);
    }
    else if (entityName === 'improvementareas') {
      this.employeeImprovementArea = this.employeeImprovementAreas[this.employeeImprovementAreas.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, ImprovementAreaDialogComponent, id, this.employeeImprovementAreas);
    }
    else {
      console.log(entityName + " not found");
    }
  }

  openEntityUpdateDialog(entityName, dialogComponent, id, entityArray): void {
    const index = entityArray.findIndex(e => e.id === id);
    let entity = entityArray[index];
    var entityCopy = Object.assign({}, entity);

    let dialogRef = this.dialog.open(dialogComponent, {
      data: this
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateEntity(entityName, id, result, entityArray);
      } else {
        entityArray[index] = entityCopy;
      }
    });
  }

  updateEntity(entityName, id, entity, entityArray) {
    this.dataService.updateEntity(entityName, id, entity)
      .then((resCustomerData) => {
        let index = entityArray.findIndex(e => e.id === entity.id);
        entityArray[index] = entity;
      },
      (err) => console.log(entityName + " could not be updated :" + err)
      );
  }

  navigateViewTeam(teamId) {
    this.router.navigate(['view/team', teamId], { skipLocationChange: false });
  }

  delelteEntity(entityName, id, entityArray) {
    this.dataService.delelteEntity(entityName, id)
      .then((resCustomerData) => {
        entityArray.splice(entityArray.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log(entityName + " could not be deleted :" + err)
      );
  }

}
