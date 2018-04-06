import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { Customer } from './customer';
import { AddressDialogComponent } from './addresses/address-dialog.component';
import { StakeholderDialogComponent } from './stakeholder/stakeholder-dialog.component';
import { GoalDialogComponent } from './goal/goal-dialog.component';
import { TeamDialogComponent } from './team/team-dialog.component';
import { TravelDialogComponent } from './travel/travel-dialog.component';

import { BreadCrumb } from '../menu/breadCrumb';
import { Address } from './addresses/address';
import { Team } from './team/team';
import { Goal } from './goal/goal';
import { Stakeholder } from './stakeholder/stakeholder';
import { Travel } from './travel/travel';

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html'
})
export class CustomerViewComponent {
  id: number;

  customer: Customer;
  customerAddresses = [];
  customerTeams = [];
  customerGoals = [];
  customerStakeholders = [];
  customerTravels = [];

  customerStakeholder = new Stakeholder();
  customerGoal = new Goal();
  customerTravel = new Travel();
  customerAddress = new Address();
  customerTeam = new Team();
  goalTenures: Array<String>;

  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.goalTenures = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {

        this.dataService.getEntityData('customers', this.id)
          .then((resCustomerData) => {
            this.customer = resCustomerData;

            this.customer.goals.forEach(e => this.customerGoals.push(e));
            this.customer.teams.forEach(e => this.customerTeams.push(e));
            this.customer.addresses.forEach(e => this.customerAddresses.push(e));
            this.customer.stakeHolders.forEach(e => this.customerStakeholders.push(e));
            this.customer.travels.forEach(e => this.customerTravels.push(e));
          });
      }
    });
  }

  openDialog(entityName): void {
    if (entityName === 'addresses') {
      this.customerAddress = new Address();
      this.openEntityDialog(AddressDialogComponent, entityName, this.customerAddresses);
    }
    else if (entityName === 'teams') {
      this.customerTeam = new Team();
      this.openEntityDialog(TeamDialogComponent, entityName, this.customerTeams);
    }
    else if (entityName === 'goals') {
      this.customerGoal = new Goal();
      this.openEntityDialog(GoalDialogComponent, entityName, this.customerGoals);
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
    entity.customerId = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(entityName: String, id: number): void {
    if (entityName === 'addresses') {
      this.customerAddress = this.customerAddresses[this.customerAddresses.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, AddressDialogComponent, id, this.customerAddresses);
    }
    else if (entityName === 'teams') {
      this.customerTeam = this.customerTeams[this.customerTeams.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, TeamDialogComponent, id, this.customerTeams);
    }
    else if (entityName === 'goals') {
      this.customerGoal = this.customerGoals[this.customerGoals.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, GoalDialogComponent, id, this.customerGoals);
    }
    else if (entityName === 'stakeholders') {
      this.customerStakeholder = this.customerStakeholders[this.customerStakeholders.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, StakeholderDialogComponent, id, this.customerStakeholders);
    }
    else if (entityName === 'travels') {
      this.customerTeam = this.customerTeams[this.customerTeams.findIndex(e => e.id === id)];
      this.openEntityUpdateDialog(entityName, TeamDialogComponent, id, this.customerTeams);
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

  addBreadCrumb(label, url, entityId) {
    let bread = new BreadCrumb();
    bread.id = "id";
    bread.label = label;
    bread.url = url;
    bread.entityId = entityId;
    console.log(bread)
    this.dataService.changeMessage(bread)
  }

  navigateViewTeam(teamId) {
    this.addBreadCrumb('Team', '/team-view', teamId);
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
