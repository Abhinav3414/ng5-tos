import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

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

  employeeFeedbacks: any;
  employeeImprovementAreas: any;

  employeeTeamMembers: any;

  isUpdate: boolean = true;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;
        console.log(this.employeeService)
        this.employeeService.getEmployeeData(this.id)
          .then((resemployeeData) => {
            this.employee = resemployeeData;
            console.log(this.employee)
            //  console.log(this.employee)
            if (this.employee.skills.length > 0) {
              for (var i = 0; i < this.employee.skills.length; i++) {
                this.employeeSkills.push(this.employee.skills[i]);
                console.log(this.employeeSkills);
              }
            }
            if (this.employee.certifications.length > 0) {
              for (var i = 0; i < this.employee.certifications.length; i++) {
                this.employeeCertifications.push(this.employee.certifications[i]);
                console.log(this.employeeCertifications);
              }
            }
            if (this.employee.trainings.length > 0) {
              for (var i = 0; i < this.employee.trainings.length; i++) {
                this.employeeTrainings.push(this.employee.trainings[i]);
                console.log(this.employeeTrainings);
              }
            }

          });


      }
    });

  }
  /*

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
  }

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
