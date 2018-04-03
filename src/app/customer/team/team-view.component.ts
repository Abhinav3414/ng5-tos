import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

import { ProjectRythmDialogComponent } from './projectrythm/projectrythm-dialog.component';
import { ActionDialogComponent } from './action/action-dialog.component';
import { TeamMemberDialogComponent } from './teammember/teammember-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { Team } from './team';
import { TeamMember } from './teammember/teammember';
import { Action } from './action/action';
import { Projectrythm } from './projectrythm/projectrythm';

@Component({
  selector: 'team-view',
  templateUrl: './team-view.html'
})

export class TeamViewComponent {
  id: number;
  team: Team;
  employee = [];
  customerTeamMembers = [];
  customerActions = [];
  customerProjectRythms = [];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {

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
    this.openDialog(TeamMemberDialogComponent, 'teammembers', new TeamMember(), this.customerTeamMembers);
  }

  openActionDialog(): void {
    this.openDialog(ActionDialogComponent, 'actions', new Action(), this.customerActions);
  }

  openProjectRythmDialog(): void {
    this.openDialog(ProjectRythmDialogComponent, 'projectrythms', new Action(), this.customerProjectRythms);
  }

  openDialog(dialogComponent, entityName, entity, entityArray) {
    let dialogRef = this.dialog.open(dialogComponent, {
      data: entity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        if (entityName === 'teammembers') {
          this.addNewTeamMember(entityName, result, entityArray);
        }
        else {
          this.addNewEntity(entityName, result, entityArray);
        }
      }
    });
  }

  addNewEntity(entityName, entity, entityArray) {
    entity.teamId = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewTeamMember(entityName, entity, entityArray) {
    entity.team_Id = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        let tempEntity = resCustomerData;
        this.dataService.getEntityData('employees', tempEntity.employeeId)
          .then((resData) => {
            tempEntity.name = resData.name;
          },
          (err) => console.log("Emplyee name could not be fetched :" + err)
          );
        entityArray.push(tempEntity);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openTeamMemberUpdateDialog(id: number): void {
    this.openUpdateDialog('teammembers', TeamMemberDialogComponent, id, this.customerTeamMembers);
  }

  openProjectRythmUpdateDialog(id: number): void {
    this.openUpdateDialog('projectrythms', ProjectRythmDialogComponent, id, this.customerProjectRythms);
  }

  openActionUpdateDialog(id: number): void {
    this.openUpdateDialog('actions', ActionDialogComponent, id, this.customerActions);
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
        if (entityName === 'teammembers')
          this.updateTeamMember(entityName, id, result, entityArray);
        else
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

  updateTeamMember(entityName, id, entity, entityArray) {
    this.dataService.getEntityData('employees', entity.employeeId)
      .then((resData) => {
        var empName = resData.name;

        this.dataService.updateEntity(entityName, id, entity)
          .then((resCustomerData) => {
            let index = entityArray.findIndex(e => e.id === entity.id);
            entity.name = empName;
            entityArray[index] = entity;
          },
          (err) => console.log(entityName + " could not be updated :" + err)
          );
      },
      (err) => console.log("employee name could not be fetched :" + err)
      );
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
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
