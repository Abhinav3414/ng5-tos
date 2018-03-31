import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { CustomerService } from '../customer/customer.service';

import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SkillDialogComponent } from './skill/skill-dialog.component';
import { CertificationDialogComponent } from './certification/certification-dialog.component';
import { TrainingDialogComponent } from './training/training-dialog.component';
import { FeedbackDialogComponent } from './feedback/feedback-dialog.component';
import { ImprovementAreaDialogComponent } from './improvementarea/improvementarea-dialog.component';

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'employee-view',
  templateUrl: './employee-view.html'
})
export class EmployeeViewComponent {
  id: number;

  skill: any;
  certification: any;
  training: any;
  feedback: any;
  improvementArea: any;

  employee: Employee;
  employeeSkills = [];
  employeeCertifications = [];
  employeeTrainings = [];
  employeeFeedbacks = [];
  employeeImprovementAreas = [];
  employeeTeamMembers = [];
  teams = [];
  isUpdate: boolean = true;
  //fileNameDialogRef: MatDialogRef<EmployeeDialogComponent>;

  constructor(private employeeService: EmployeeService, private customerService: CustomerService,
    private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;
        this.employeeService.getEmployeeData(this.id)
          .then((resemployeeData) => {
            this.employee = resemployeeData;
            if (this.employee.skills.length > 0) {
              for (var i = 0; i < this.employee.skills.length; i++) {
                this.employeeSkills.push(this.employee.skills[i]);
              }
            }
            if (this.employee.certifications.length > 0) {
              for (var i = 0; i < this.employee.certifications.length; i++) {
                this.employeeCertifications.push(this.employee.certifications[i]);
              }
            }
            if (this.employee.trainings.length > 0) {
              for (var i = 0; i < this.employee.trainings.length; i++) {
                this.employeeTrainings.push(this.employee.trainings[i]);
              }
            }
            if (this.employee.feedbacks.length > 0) {
              for (var i = 0; i < this.employee.feedbacks.length; i++) {
                this.employeeFeedbacks.push(this.employee.feedbacks[i]);
              }
            }
            if (this.employee.improvementAreas.length > 0) {
              for (var i = 0; i < this.employee.improvementAreas.length; i++) {
                this.employeeImprovementAreas.push(this.employee.improvementAreas[i]);
              }
            }
            if (this.employee.teamMembers.length > 0) {
              for (var i = 0; i < this.employee.teamMembers.length; i++) {
                this.employeeTeamMembers.push(this.employee.teamMembers[i]);
              }
            }
          })
          .then(() => {
            for (let i = 0; i < this.employeeTeamMembers.length; i++) {
              this.customerService.getTeamData(this.employeeTeamMembers[i].team_Id)
                .then((resCustomerData) => {
                  this.teams[i] = resCustomerData;
                });
            }
          });
      }
    });
  }

  openSkillDialog(): void {
    let dialogRef = this.dialog.open(SkillDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewSkill(result)
      }
    });
  }

  openSkillUpdateDialog(id: number): void {
    for (let key in this.employeeSkills) {
      if (this.employeeSkills[key].id === id) {
        this.skill = this.employeeSkills[key];
      }
    }

    let dialogRef = this.dialog.open(SkillDialogComponent, {
      data: this.skill
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateSkill(id, result);
      }
    });
  }

  openCertificationDialog(): void {
    let dialogRef = this.dialog.open(CertificationDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewCertification(result)
      }
    });
  }

  openCertificationUpdateDialog(id: number): void {
    for (let key in this.employeeCertifications) {
      if (this.employeeCertifications[key].id === id) {
        this.certification = this.employeeCertifications[key];
      }
    }

    let dialogRef = this.dialog.open(CertificationDialogComponent, {
      data: this.certification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateCertification(id, result);
      }
    });
  }

  openTrainingDialog(): void {
    let dialogRef = this.dialog.open(TrainingDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewTraining(result)
      }
    });
  }

  openTrainingUpdateDialog(id: number): void {
    for (let key in this.employeeTrainings) {
      if (this.employeeTrainings[key].id === id) {
        this.training = this.employeeTrainings[key];
      }
    }

    let dialogRef = this.dialog.open(TrainingDialogComponent, {
      data: this.training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateTraining(id, result);
      }
    });
  }

  openFeedbackDialog(): void {
    let dialogRef = this.dialog.open(FeedbackDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewFeedback(result)
      }
    });
  }

  openFeedbackUpdateDialog(id: number): void {
    for (let key in this.employeeFeedbacks) {
      if (this.employeeFeedbacks[key].id === id) {
        this.feedback = this.employeeFeedbacks[key];
      }
    }

    let dialogRef = this.dialog.open(FeedbackDialogComponent, {
      data: this.feedback
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateFeedback(id, result);
      }
    });
  }

  openImprovementAreaDialog(): void {
    let dialogRef = this.dialog.open(ImprovementAreaDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewFeedback(result)
      }
    });
  }

  openImprovementAreaUpdateDialog(id: number): void {
    for (let key in this.employeeImprovementAreas) {
      if (this.employeeImprovementAreas[key].id === id) {
        this.improvementArea = this.employeeImprovementAreas[key];
      }
    }

    let dialogRef = this.dialog.open(ImprovementAreaDialogComponent, {
      data: this.improvementArea
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateFeedback(id, result);
      }
    });
  }


  addNewSkill(skill) {
    skill.employeeId = this.id;
    this.employeeService.postEntity('skills',skill);
    location.reload();
  }

  addNewCertification(certification) {
    certification.employeeId = this.id;
    this.employeeService.postEntity('certifications',certification);
    location.reload();
  }

  addNewTraining(training) {
    training.employeeId = this.id;
    this.employeeService.postEntity('trainings',training);
    location.reload();
  }

  addNewFeedback(feedback) {
    feedback.employeeId = this.id;
    this.employeeService.postEntity('feedbacks',feedback);
    location.reload();
  }

  addNewImprovementArea(improvementArea) {
    improvementArea.employeeId = this.id;
    this.employeeService.postEntity('improvementareas',improvementArea);
    location.reload();
  }

  updateTraining(id, training) {
    this.employeeService.getEntityData('trainings',id)
      .then((resCustomerData) => {
        this.training = resCustomerData;
        this.training.name = training.name;
        this.training.mode = training.mode;
        this.training.proposedDate = training.proposedDate;
        this.training.reason = training.reason;
        this.employeeService.updateEntity('trainings',this.training.id, this.training);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateCertification(id, certification) {
    this.employeeService.getEntityData('certifications',id)
      .then((resCustomerData) => {
        this.certification = resCustomerData;
        this.certification.name = certification.name;
        this.certification.yearOfCertification = certification.yearOfCertification;
        this.employeeService.updateEntity('certifications',this.certification.id, this.certification);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateSkill(id, skill) {
    this.employeeService.getEntityData('skills',id)
      .then((resCustomerData) => {
        this.skill = resCustomerData;
        this.skill.name = skill.name;
        this.skill.duration = skill.duration;
        this.skill.rating = skill.rating;
        this.skill.lastUsed = skill.lastUsed;
        this.employeeService.updateEntity('skills',this.skill.id, this.skill);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateFeedback(id, feedback) {
    this.employeeService.getEntityData('feedbacks',id)
      .then((resCustomerData) => {
        this.feedback = resCustomerData;
        this.feedback.name = feedback.name;
        this.employeeService.updateEntity('feedbacks',this.feedback.id, this.feedback);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateImprovementArea(id, improvementArea) {
    this.employeeService.getEntityData('improvementareas',id)
      .then((resCustomerData) => {
        this.improvementArea = resCustomerData;
        this.improvementArea.name = improvementArea.name;
        this.employeeService.updateEntity('improvementareas',this.improvementArea.id, this.improvementArea);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
  }

  delelteSkill(id) {
    this.employeeService.delelteEntity('skills',id);
    location.reload();
  }

  delelteCertification(id) {
    this.employeeService.delelteEntity('certifications',id);
    location.reload();
  }

  delelteTraining(id) {
    this.employeeService.delelteEntity('trainings',id);
    location.reload();
  }

  delelteFeedback(id) {
    this.employeeService.delelteEntity('feedbacks',id);
    location.reload();
  }

  delelteImprovementArea(id) {
    this.employeeService.delelteEntity('improvementareas',id);
    location.reload();
  }

}
