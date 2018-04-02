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

            this.team.teamMembers.forEach(e => this.customerTeamMembers.push(e));
            this.team.actions.forEach(e => this.customerActions.push(e));
            this.team.projectRythms.forEach(e => this.customerProjectRythms.push(e));

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
        console.log(result)
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
    this.dataService.postEntity('actions', action)
      .then((resCustomerData) => {
        this.customerActions.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewProjectRythm(projectrythm) {
    projectrythm.teamId = this.id;
    this.dataService.postEntity('projectrythms', projectrythm)
      .then((resCustomerData) => {
        this.customerProjectRythms.push(resCustomerData);
      },
      (err) => console.log("ProjectRythm could not be added :" + err)
      );
  }

  addNewTeamMember(teammember) {
    teammember.team_Id = this.id;
    this.dataService.postEntity('teammembers', teammember)
      .then((resCustomerData) => {
        let tempMember = resCustomerData;
        this.dataService.getEntityData('employees', teammember.employeeId)
          .then((resData) => {
            tempMember.name = resData.name;
          },
          (err) => console.log("Emplyee name could not be fetched :" + err)
          );
        this.customerTeamMembers.push(tempMember);
      },
      (err) => console.log("TeamMember could not be added :" + err)
      );
  }

  updateTeamMember(id, teammember) {
    this.dataService.getEntityData('teammembers', id)
      .then((resCustomerData) => {
        this.teammember = resCustomerData;
        this.teammember.role = teammember.role;
        this.teammember.productivity = teammember.productivity;
        this.teammember.employeeId = teammember.employeeId;
        let empName;
        this.dataService.getEntityData('employees', teammember.employeeId)
          .then((resData) => {
            empName = resData.name;
            this.teammember.name = empName;
            let tempTeamMember = this.teammember;
            this.dataService.updateEntity('teammembers', this.teammember.id, this.teammember)
              .then((resCustomerData) => {
                let index;
                this.customerTeamMembers.forEach(function(teamMemb, i) {
                  if (teamMemb.id === tempTeamMember.id)
                    index = i;
                });
                this.customerTeamMembers[index] = tempTeamMember;
              },
              (err) => console.log("Emplyee name could not be fetched :" + err)
              );
          },
          (err) => console.log("TeamMember could not be updated :" + err)
          );
      });
  }

  updateAction(id, action) {
    this.dataService.getEntityData('actions', id)
      .then((resCustomerData) => {
        this.action = resCustomerData;
        this.action.details = action.details;
        this.action.cause = action.cause;
        this.action.platform = action.platform;
        this.action.status = action.status;
        let tempAction = this.action;

        this.dataService.updateEntity('actions', this.action.id, this.action)
          .then((resCustomerData) => {
            let index;
            this.customerActions.forEach(function(act, i) {
              if (act.id === tempAction.id)
                index = i;
            });
            this.customerActions[index] = tempAction;
          },
          (err) => console.log("Action could not be updated :" + err)
          );
      });
  }

  updateProjectRythm(id, projectRythm) {
    this.dataService.getEntityData('projectrythms', id)
      .then((resCustomerData) => {
        this.projectRythm = resCustomerData;
        this.projectRythm.event = projectRythm.event;
        this.projectRythm.frequency = projectRythm.frequency;
        this.projectRythm.whoRythm = projectRythm.whoRythm;
        this.projectRythm.whereRythm = projectRythm.whereRythm;

        let tempProjectRythm = this.projectRythm;

        this.dataService.updateEntity('projectrythms', this.projectRythm.id, this.projectRythm)
          .then((resCustomerData) => {
            let index;
            this.customerProjectRythms.forEach(function(act, i) {
              if (act.id === tempProjectRythm.id)
                index = i;
            });
            this.customerProjectRythms[index] = tempProjectRythm;
          },
          (err) => console.log("ProjectRythm could not be updated :" + err)
          );
      });
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }


  delelteTeamAction(id) {
    this.dataService.delelteEntity('actions', id)
      .then((resCustomerData) => {
        this.customerActions.splice(this.customerActions.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("TeamAction could not be deleted :" + err)
      );
  }

  delelteProjectRythm(id) {
    this.dataService.delelteEntity('projectrythms', id)
      .then((resCustomerData) => {
        this.customerProjectRythms.splice(this.customerProjectRythms.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("ProjectRythm could not be deleted :" + err)
      );
  }

  delelteTeamMember(id) {
    this.dataService.delelteEntity('teammembers', id)
      .then((resCustomerData) => {
        this.customerTeamMembers.splice(this.customerTeamMembers.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("TeamMember could not be deleted :" + err)
      );
  }

}
