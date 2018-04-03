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

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'employee-view',
  templateUrl: './employee-view.html'
})
export class EmployeeViewComponent {
  id: number;

  employee: Employee;
  employeeSkills = [];
  employeeCertifications = [];
  employeeTrainings = [];
  employeeFeedbacks = [];
  employeeImprovementAreas = [];
  employeeTeamMembers = [];
  teams = [];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
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

  openSkillDialog(): void {
    this.openDialog(SkillDialogComponent, 'skills', new Skill(), this.employeeSkills);
  }

  openCertificationDialog(): void {
    this.openDialog(CertificationDialogComponent, 'certifications', new Certification(), this.employeeCertifications);
  }

  openTrainingDialog(): void {
    this.openDialog(TrainingDialogComponent, 'trainings', new Training(), this.employeeTrainings);
  }

  openFeedbackDialog(): void {
    this.openDialog(FeedbackDialogComponent, 'feedbacks', new Feedback(), this.employeeFeedbacks);
  }

  openImprovementAreaDialog(): void {
    this.openDialog(ImprovementAreaDialogComponent, 'improvementareas', new ImprovementArea(), this.employeeImprovementAreas);
  }

  openDialog(dialogComponent, entityName, entity, entityArray) {
    let dialogRef = this.dialog.open(dialogComponent, {
      data: entity
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

  openSkillUpdateDialog(id: number): void {
    this.openUpdateDialog('skills', SkillDialogComponent, id, this.employeeSkills);
  }

  openCertificationUpdateDialog(id: number): void {
    this.openUpdateDialog('certifications', CertificationDialogComponent, id, this.employeeCertifications);
  }

  openTrainingUpdateDialog(id: number): void {
    this.openUpdateDialog('trainings', TrainingDialogComponent, id, this.employeeTrainings);
  }

  openFeedbackUpdateDialog(id: number): void {
    this.openUpdateDialog('feedbacks', FeedbackDialogComponent, id, this.employeeFeedbacks);
  }

  openImprovementAreaUpdateDialog(id: number): void {
    this.openUpdateDialog('improvementareas', ImprovementAreaDialogComponent, id, this.employeeImprovementAreas);
  }

  openUpdateDialog(entityName, dialogComponent, id, entityArray): void {
    const index = entityArray.findIndex(e => e.id === id);
    let entity = entityArray[index];
    var entityCopy = Object.assign({}, entity);

    let dialogRef = this.dialog.open(dialogComponent, {
      data: entity
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
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
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
