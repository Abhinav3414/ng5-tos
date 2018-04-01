import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Teams } from './teams';
import { ProjectRythmDialogComponent } from './projectrythm/projectrythm-dialog.component';
import { ActionDialogComponent } from './action/action-dialog.component';
import { TeamMemberDialogComponent } from './teammember/teammember-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'team-view',
  templateUrl: './team-view.html'
})

export class TeamViewComponent {
  id: number;
  projectRythm: any;
  action: any;
  teammember: any;
  team: Teams;
  employee = [];
  customerTeamMembers = [];
  customerActions = [];
  customerProjectRythms = [];
  isUpdate: boolean = true;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;

        this.dataService.getEntityData('teams', this.id)
          .then((resCustomerData) => {
            this.team = resCustomerData;
            if (this.team.teamMembers.length > 0) {
              for (let i = 0; i < this.team.teamMembers.length; i++) {
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
              this.dataService.getEntityData('employees', this.customerTeamMembers[i].employeeId)
                .then((resCustomerData) => {
                  this.customerTeamMembers[i].name = resCustomerData.name;
                });
            }
          });
      }
    });
  }

  openTeamMemberDialog(): void {
    let dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewTeamMember(result)
      }
    });
  }

  openTeamMemberUpdateDialog(id: number): void {
    for (let key in this.customerTeamMembers) {
      if (this.customerTeamMembers[key].id === id) {
        this.teammember = this.customerTeamMembers[key];
      }
    }
    let dialogRef = this.dialog.open(TeamMemberDialogComponent, {
      data: this.teammember
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateTeamMember(id, result);
      }
    });
  }

  openActionDialog(): void {
    let dialogRef = this.dialog.open(ActionDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewAction(result)
      }
    });
  }

  openActionUpdateDialog(id: number): void {
    for (let key in this.customerActions) {
      if (this.customerActions[key].id === id) {
        this.action = this.customerActions[key];
      }
    }
    let dialogRef = this.dialog.open(ActionDialogComponent, {
      data: this.action
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateAction(id, result);
      }
    });
  }

  openProjectRythmDialog(): void {
    let dialogRef = this.dialog.open(ProjectRythmDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewProjectRythm(result)
      }
    });
  }

  openProjectRythmUpdateDialog(id: number): void {
    for (let key in this.customerProjectRythms) {
      if (this.customerProjectRythms[key].id === id) {
        this.projectRythm = this.customerProjectRythms[key];
      }
    }

    let dialogRef = this.dialog.open(ProjectRythmDialogComponent, {
      data: this.projectRythm
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateProjectRythm(id, result);
      }
    });
  }

  addNewAction(action) {
    action.teamId = this.id;
    this.dataService.postEntity('actions', action);
    location.reload();
  }

  addNewProjectRythm(projectrythm) {
    projectrythm.teamId = this.id;
    this.dataService.postEntity('projectrythms', projectrythm);
    location.reload();
  }

  addNewTeamMember(teammember) {
    teammember.team_Id = this.id;
    console.log(teammember)
    this.dataService.postEntity('teammembers', teammember);
    location.reload();
  }

  updateTeamMember(id, teammember) {
    this.dataService.getEntityData('teammembers', id)
      .then((resCustomerData) => {
        this.teammember = resCustomerData;
        this.teammember.role = teammember.role;
        this.teammember.productivity = teammember.productivity;
        this.teammember.employeeId = teammember.employeeId;
        console.log(this.teammember)
        this.dataService.updateEntity('teammembers', this.teammember.id, this.teammember);
      });
    setTimeout(() => {
      //  location.reload();
    }, 500);
  }

  updateAction(id, action) {
    this.dataService.getEntityData('actions', id)
      .then((resCustomerData) => {
        this.action = resCustomerData;
        this.action.details = action.details;
        this.action.cause = action.cause;
        this.action.platform = action.platform;
        this.action.status = action.status;
        this.dataService.updateEntity('actions', this.action.id, this.action);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateProjectRythm(id, projectRythm) {
    this.dataService.getEntityData('projectrythms', id)
      .then((resCustomerData) => {
        this.projectRythm = resCustomerData;
        this.projectRythm.event = projectRythm.event;
        this.projectRythm.frequency = projectRythm.frequency;
        this.projectRythm.whoRythm = projectRythm.whoRythm;
        this.projectRythm.whereRythm = projectRythm.whereRythm;
        this.dataService.updateEntity('projectrythms', this.projectRythm.id, this.projectRythm);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  navigateNewTeamMember(teamId) {
    this.router.navigate(['/action/' + teamId + '/new'], { skipLocationChange: true });
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

  delelteTeamAction(id) {
    this.dataService.delelteEntity('actions',id);
    location.reload();
  }

  delelteProjectRythm(id) {
    this.dataService.delelteEntity('projectrythms',id);
    location.reload();
  }

  delelteTeamMember(id) {
    this.dataService.delelteEntity('teammembers',id);
    location.reload();
  }

}
