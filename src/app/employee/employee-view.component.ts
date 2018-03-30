import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { CustomerService } from '../customer/customer.service';

import {EmployeeDialogComponent} from './employee-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  openDialog(): void {
      let dialogRef = this.dialog.open(EmployeeDialogComponent, {
        data: this.isUpdate
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
      //  this.addNewEmployee(result)

      });
    //  dialogRef.close('Pizza!');
    }

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
  }
  /*
  navigateNewGoals(custId) {
    this.router.navigate(['/goals/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewTeams(custId) {
    this.router.navigate(['/teams/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewAddress(custId) {
    this.router.navigate(['/address/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewStakeholders(custId) {
    this.router.navigate(['/stakeholder/'+custId+'/new'], { skipLocationChange: true });
  }

  delelteGoal(id, custId) {
    this.employeeService.delelteGoal(id);
    this.router.navigate(['/employee-view', custId]);
    location.reload()
/*
  location.pathname = '/employee-view/'+custId;
    const url = this.router.url.split('?')[0]; // this will remove previous queryparms
    this.router.navigate([url], { queryParams: { page: event },  skipLocationChange: true });

    setTimeout(() => {
        location.reload();
    }, 1000);

  }

  delelteTeam(id) {
    this.employeeService.delelteTeam(id);
    location.reload();
  }

  delelteAddress(id) {
    this.employeeService.delelteAddress(id);
    location.reload();
  }

  delelteStakeholder(id) {
    this.employeeService.delelteStakeholder(id);
    location.reload();
  }
*/
}
