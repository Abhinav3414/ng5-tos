import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Teams } from './teams';

@Component({
  selector: 'team-view',
  templateUrl: './team-view.html'
})

export class TeamViewComponent {
  id: number;
  team: Teams;
  employee = [];
  customerTeamMembers = [];
  customerActions = [];
  customerProjectRythms = [];
  isUpdate: boolean = true;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;

        this.customerService.getCustomerTeamData(this.id)
          .then((resCustomerData) => {
            this.team = resCustomerData;
            if (this.team.teamMembers.length > 0) {
              for (let i = 0; i < this.team.teamMembers.length; i++) {
                console.log(this.team.teamMembers[i]);
                this.customerTeamMembers.push(this.team.teamMembers[i]);
              }
            }
            if (this.team.actions.length > 0) {
              for (let i = 0; i < this.team.actions.length; i++) {
                this.customerActions.push(this.team.actions[i]);
              }
            }
            if (this.team.projectRythms.length > 0) {
              for (let i = 0; i < this.team.projectRythms.length; i++) {
                this.customerProjectRythms.push(this.team.projectRythms[i]);
              }
            }
          }).then(() => {
            for (let i = 0; i < this.customerTeamMembers.length; i++) {
              this.customerService.getEmployeeData(this.customerTeamMembers[i].employeeId)
                .then((resCustomerData) => {
                  this.customerTeamMembers[i].name = resCustomerData.name;
                });
            }
          });
      }
    });
  }

  navigateNewProjectRythm(teamId) {
    this.router.navigate(['/projectrythm/' + teamId + '/new'], { skipLocationChange: true });
  }

  navigateNewTeamAction(teamId) {
    this.router.navigate(['/action/' + teamId + '/new'], { skipLocationChange: true });
  }

  navigateNewTeamMember(teamId) {
    this.router.navigate(['/action/' + teamId + '/new'], { skipLocationChange: true });
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

  delelteTeamAction(id) {
    this.customerService.delelteAction(id);
    location.reload();
  }

  delelteProjectRythm(id) {
    this.customerService.delelteProjectRythm(id);
    location.reload();
  }

  delelteTeamMember(id) {
    this.customerService.delelteTeamMember(id);
    location.reload();
  }

}
