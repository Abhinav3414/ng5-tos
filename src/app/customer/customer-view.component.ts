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
  customerStakeholder = new Stakeholder();
  customerGoal = new Goal();
  customerTravel = new Travel();
  customerAddress = new Address();
  customerTeam = new Team();
  goalTenures: Array<String>;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
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

  openAddressDialog(): void {
    this.customerAddress = new Address();
    this.openDialog(AddressDialogComponent, 'addresses', this.customerAddress, this.customerAddresses);
  }

  openTeamDialog(): void {
    this.customerTeam = new Team();
    this.openDialog(TeamDialogComponent, 'teams', this.customerTeam, this.customerTeams);
  }

  openGoalDialog(): void {
    this.customerGoal = new Goal();
    this.openDialog(GoalDialogComponent, 'goals', this.customerGoal, this.customerGoals);
  }

  openStakeholderDialog(): void {
    this.customerStakeholder = new Stakeholder();
    this.openDialog(StakeholderDialogComponent, 'stakeholders', this.customerStakeholder, this.customerStakeholders);
  }

  openTravelDialog(): void {
    this.customerTravel = new Travel();
    this.openDialog(TravelDialogComponent, 'travels', this.customerTravel, this.customerTravels);
  }

  openDialog(dialogComponent, entityName, entity, entityArray) {
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

  openAddressUpdateDialog(id: number): void {
    const index = this.customerAddresses.findIndex(e => e.id === id);
    this.customerAddress = this.customerAddresses[index];
    this.openUpdateDialog('addresses', AddressDialogComponent, id, this.customerAddresses);
  }

  openGoalUpdateDialog(id: number): void {
    const index = this.customerGoals.findIndex(e => e.id === id);
    this.customerGoal = this.customerGoals[index];
    this.openUpdateDialog('goals', GoalDialogComponent, id, this.customerGoals);
  }

  openStakeholderUpdateDialog(id: number): void {
    const index = this.customerStakeholders.findIndex(e => e.id === id);
    this.customerStakeholder = this.customerStakeholders[index];
    this.openUpdateDialog('stakeholders', StakeholderDialogComponent, id, this.customerStakeholders);
  }

  openTravelUpdateDialog(id: number): void {
    const index = this.customerTravels.findIndex(e => e.id === id);
    this.customerTravel = this.customerTravels[index];
    this.openUpdateDialog('travels', TravelDialogComponent, id, this.customerTravels);
  }

  openTeamUpdateDialog(id: number): void {
    const index = this.customerTeams.findIndex(e => e.id === id);
    this.customerTeam = this.customerTeams[index];
    this.openUpdateDialog('travels', TeamDialogComponent, id, this.customerTeams);
  }


  openUpdateDialog(entityName, dialogComponent, id, entityArray): void {
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
