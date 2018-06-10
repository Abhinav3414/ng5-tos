import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { Customer } from './customer';
import { StakeholderDialogComponent } from './stakeholder/stakeholder-dialog.component';
import { GoalDialogComponent } from './goal/goal-dialog.component';
import { ActionDialogComponent } from './team/action/action-dialog.component';
import { TeamDialogComponent } from './team/team-dialog.component';
import { TravelDialogComponent } from './travel/travel-dialog.component';

import { BreadCrumb } from '../menu/breadCrumb';
import { Team } from './team/team';
import { Ace5 } from '../ace5/ace5';
import { Goal } from './goal/goal';
import { Action } from './team/action/action';
import { Stakeholder } from './stakeholder/stakeholder';
import { Travel } from './travel/travel';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class CustomerViewComponent {
  panelOpenState: any;

  id: number;

  customer: Customer;
  customerAddresses = [];
  customerTeams = [];
  customerGoals = [];
  customerActions = [];
  customerStakeholders = [];
  customerTravels = [];

  mainStakeHolderId: any = undefined;

  customerStakeholder = new Stakeholder();
  customerGoal = new Goal();
  customerAction = new Action();
  customerTravel = new Travel();
  customerTeam = new Team();
  goalTenures = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {

        this.dataService.getEntityData('customers', this.id)
          .then((resCustomerData) => {
            this.customer = resCustomerData;
            this.customer.goals.forEach(e => this.customerGoals.push(e));
            this.customer.teams.forEach(e => this.customerTeams.push(e));
            this.customer.travels.forEach(e => this.customerTravels.push(e));
            this.customer.actions.forEach(e => {
              if (e.ace5Id === null) {
                this.customerActions.push(e);
              }
            });
            this.customer.stakeHolders.forEach(e => {
              this.customerStakeholders.push(e);
              if (e.contactPerson === true) { this.mainStakeHolderId = e.id; }
            });
          });
      }
    });

  }

  //function to have only single StakeHolder as customer contactPerson
  getDisabled(id) {
    if (this.mainStakeHolderId === undefined) {
      return false;
    }
    return (this.mainStakeHolderId === id) ? false : true;
  }

  getGoalDesc(goalId) {
    var index = this.customerGoals.findIndex(e => e.id === goalId);
    return this.customerGoals[index].description;
  }

  openDialog(entityName): void {
    if (entityName === 'teams') {
      this.customerTeam = new Team();
      this.openEntityDialog(TeamDialogComponent, entityName, this.customerTeams);
    }
    else if (entityName === 'goals') {
      this.customerGoal = new Goal();
      this.openEntityDialog(GoalDialogComponent, entityName, this.customerGoals);
    }
    else if (entityName === 'actions') {
      this.customerAction = new Action();
      this.customerAction.customerId = this.id;
      this.openEntityDialog(ActionDialogComponent, entityName, this.customerActions);
    }
    else if (entityName === 'stakeholders') {
      this.customerStakeholder = new Stakeholder();
      this.openEntityDialog(StakeholderDialogComponent, entityName, this.customerStakeholders);
    }
    else if (entityName === 'travels') {
      this.customerTravel = new Travel();
      this.openEntityDialog(TravelDialogComponent, entityName, this.customerTravels);
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
    if (entityName === 'stakeholders' && entity.contactPerson === true) {
      this.customer.contactPerson = entity.name;
    }
    this.dataService.updateEntity('customers', +this.customer.id, this.customer);
    entity.customerId = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        if (entityName === 'stakeholders' && entity.contactPerson === true) {
          this.mainStakeHolderId = resCustomerData["id"];
        }
        entityArray.push(resCustomerData);
        entityName = (entityName === 'stakeholders') ? 'stakeHolders' : entityName;
        this.customer[entityName].push(resCustomerData);

      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(entityName: String, id: number): void {
    if (entityName === 'teams') {
      this.customerTeam = this.customerTeams[this.customerTeams.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, TeamDialogComponent, id, this.customerTeams);
    }
    else if (entityName === 'goals') {
      this.customerGoal = this.customerGoals[this.customerGoals.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, GoalDialogComponent, id, this.customerGoals);
    }
    else if (entityName === 'actions') {
      this.customerAction = this.customerActions[this.customerActions.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, ActionDialogComponent, id, this.customerActions);
    }
    else if (entityName === 'stakeholders') {
      this.customerStakeholder = this.customerStakeholders[this.customerStakeholders.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, StakeholderDialogComponent, id, this.customerStakeholders);
    }
    else if (entityName === 'travels') {
      this.customerTravel = this.customerTravels[this.customerTravels.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, TravelDialogComponent, id, this.customerTravels);
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
    // Logic to update Stakeholder as Contact Person in Customer
    if (entityName === 'stakeholders' && (this.mainStakeHolderId === entity.id || this.mainStakeHolderId === undefined)) {
      this.mainStakeHolderId = (entity.contactPerson === false) ? undefined : entity.id;
    }
    this.customer.contactPerson = (this.mainStakeHolderId !== undefined) ? entity.name : '';
    this.dataService.updateEntity('customers', +this.customer.id, this.customer);

    this.dataService.updateEntity(entityName, id, entity)
      .then((resCustomerData) => {

        let index = entityArray.findIndex(e => e.id === entity.id);
        entityArray[index] = entity;

        entityName = (entityName === 'stakeholders') ? 'stakeHolders' : entityName;
        let indexOfCustomer = this.customer[entityName].findIndex(e => e.id === entity.id);
        this.customer[entityName][indexOfCustomer] = entity;

      },
      (err) => console.log(entityName + " could not be updated :" + err)
      );
  }

  navigateViewTeam(teamId) {
    let entity = this.customerTeams[this.customerTeams.findIndex(t => t.id === teamId)];
    this.utilityService.addBreadCrumb(3, 'Team', 'view/team', teamId, 'entity', entity.name);
    this.router.navigate(['view/team', teamId], { skipLocationChange: false });
  }

  navigateAce5(customerId) {
    this.dataService.getEntityData('ace5s', customerId)
      .then((resCustomerData) => {
        if (resCustomerData === null) {
          var ace5 = new Ace5();
          ace5.customerId = customerId;
          ace5.intialDiscussionDate = new Date();
          console.log("Creating new Ace5 process for customer");
          this.dataService.postEntity('ace5s', ace5)
            .then((resCustomerData) => {
              console.log(resCustomerData);
              this.navigateAce5Router(customerId);
            },
            (err) => console.log("ace5 could not be created :" + err)
            );
        }
        else {
          this.navigateAce5Router(customerId);
        }
      },
      (err) => console.log("ace5 could not be fetched :" + err)
      );
  }

  navigateAce5Router(customerId) {
    this.utilityService.addBreadCrumb(3, 'Ace5', 'view/ace5', customerId, 'entity', 'Process');
    this.router.navigate(['view/ace5', customerId]);
  }

  delelteEntity(entityName, id, entityArray) {
    if (entityName === 'stakeholders' && this.mainStakeHolderId === id) {
      this.mainStakeHolderId = undefined;
      this.customer.contactPerson = '';
      this.dataService.updateEntity('customers', +this.customer.id, this.customer);
    }
    let goalAlert = false;
    if (entityName === 'goals') {
      let index = this.customerActions.findIndex(e => e.goalId === id);
      if (index !== -1) {
        goalAlert = true;
      }
    }
    if (goalAlert === false) {
      this.dataService.delelteEntity(entityName, id)
        .then((resCustomerData) => {
          entityArray.splice(entityArray.findIndex(function(i) {
            return i.id === id;
          }), 1);
          entityName = (entityName === 'stakeholders') ? 'stakeHolders' : entityName;
          this.customer[entityName].splice(this.customer[entityName].findIndex(function(i) {
            return i.id === id;
          }), 1);
        },
        (err) => console.log(entityName + " could not be deleted :" + err)
        );
    }
    else {
      alert("Goal is assigned to an action");
    }



  }

}
