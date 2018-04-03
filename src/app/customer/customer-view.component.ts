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
  team: any;
  customerAddresses = [];
  customerTeams = [];
  customerGoals = [];
  customerStakeholders = [];
  customerTravels = [];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
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

  openAddressDialog(): void {
    this.openDialog(AddressDialogComponent, 'addresses', new Address(), this.customerAddresses);
  }

  openTeamDialog(): void {
    this.openDialog(TeamDialogComponent, 'teams', new Team(), this.customerTeams);
  }

  openGoalDialog(): void {
    this.openDialog(GoalDialogComponent, 'goals', new Goal(), this.customerGoals);
  }

  openStakeholderDialog(): void {
    this.openDialog(StakeholderDialogComponent, 'stakeholders', new Stakeholder(), this.customerStakeholders);
  }

  openTravelDialog(): void {
    this.openDialog(TravelDialogComponent, 'travels', new Travel(), this.customerTravels);
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
    entity.customerId = this.id;
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  openAddressUpdateDialog(id: number): void {
    this.openUpdateDialog('addresses', AddressDialogComponent, id, this.customerAddresses);
  }

  openGoalUpdateDialog(id: number): void {
    this.openUpdateDialog('goals', GoalDialogComponent, id, this.customerGoals);
  }

  openStakeholderUpdateDialog(id: number): void {
    this.openUpdateDialog('stakeholders', StakeholderDialogComponent, id, this.customerStakeholders);
  }

  openTravelUpdateDialog(id: number): void {
    this.openUpdateDialog('travels', TravelDialogComponent, id, this.customerTravels);
  }

  openTeamUpdateDialog(id: number): void {
    this.openUpdateDialog('travels', TeamDialogComponent, id, this.customerTeams);
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
