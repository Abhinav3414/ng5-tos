import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { Customer } from './customer';
import { AddressDialogComponent } from './addresses/address-dialog.component';
import { StakeholderDialogComponent } from './stakeholder/stakeholder-dialog.component';
import { GoalDialogComponent } from './goals/goal-dialog.component';
import { TeamDialogComponent } from './teams/team-dialog.component';
import { TravelDialogComponent } from './travel/travel-dialog.component';

import { slideInDownAnimation } from '../animations';

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html'
})
export class CustomerViewComponent {
  id: number;

  customer: Customer;
  address: any;
  stakeholder: any;
  goal: any;
  team: any;
  travel: any;
  customerGoals = [];
  customerTeams = [];
  customerAddresses = [];
  customerStakeholders = [];
  customerTravels = [];
  isUpdate: boolean = true;


  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;

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
    this.openDialog(AddressDialogComponent, 'teams', this.customerAddresses);
  }

  openTeamDialog(): void {
    this.openDialog(TeamDialogComponent, 'teams', this.customerTeams);
  }

  openGoalDialog(): void {
    this.openDialog(GoalDialogComponent, 'goals', this.customerGoals);
  }

  openStakeholderDialog(): void {
    this.openDialog(StakeholderDialogComponent, 'stakeholders', this.customerStakeholders);
  }

  openTravelDialog(): void {
    this.openDialog(TravelDialogComponent, 'travels', this.customerTravels);
  }

  openDialog(dialogComponent, entityName, entityArray) {
    let dialogRef = this.dialog.open(dialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity(entityName, result, entityArray)
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
    for (let key in this.customerAddresses) {
      if (this.customerAddresses[key].id === id) {
        this.address = this.customerAddresses[key];
      }
    }

    let dialogRef = this.dialog.open(AddressDialogComponent, {
      data: this.address
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateAddress(id, result);
      }
    });
  }


  openTeamUpdateDialog(id: number): void {
    for (let key in this.customerTeams) {
      if (this.customerTeams[key].id === id) {
        this.team = this.customerTeams[key];
      }
    }

    let dialogRef = this.dialog.open(TeamDialogComponent, {
      data: this.team
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateTeam(id, result);
      }
    });
  }


  openGoalUpdateDialog(id: number): void {
    for (let key in this.customerGoals) {
      if (this.customerGoals[key].id === id) {
        this.goal = this.customerGoals[key];
      }
    }

    let dialogRef = this.dialog.open(GoalDialogComponent, {
      data: this.goal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateGoal(id, result);
      }
    });
  }


  openStakeholderUpdateDialog(id: number): void {
    for (let key in this.customerStakeholders) {
      if (this.customerStakeholders[key].id === id) {
        this.stakeholder = this.customerStakeholders[key];
      }
    }

    let dialogRef = this.dialog.open(StakeholderDialogComponent, {
      data: this.stakeholder
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateStakeholder(id, result);
      }
    });
  }



  openTravelUpdateDialog(id: number): void {
    for (let key in this.customerTravels) {
      if (this.customerTravels[key].id === id) {
        this.travel = this.customerTravels[key];
      }
    }

    let dialogRef = this.dialog.open(TravelDialogComponent, {
      data: this.travel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateTravel(id, result);
      }
    });
  }


  updateAddress(id, address) {
    this.dataService.getEntityData('addresses', id)
      .then((resCustomerData) => {
        this.address = resCustomerData;
        this.address.addressType = address.addressType;
        this.address.houseNo = address.houseNo;
        this.address.street = address.street;
        this.address.landMark = address.landMark;
        this.address.city = address.city;
        this.address.zip = address.zip;
        this.address.state = address.state;
        this.address.country = address.country;
        let tempAdd = this.address;
        this.dataService.updateEntity('addresses', this.address.id, this.address)
          .then((resCustomerData) => {
            let index;
            this.customerAddresses.forEach(function(add, i) {
              if (add.id === tempAdd.id)
                index = i;
            });
            this.customerAddresses[index] = tempAdd;
          },
          (err) => console.log("Address " + tempAdd.name + " could not be updated :" + err)
          );
      });
  }

  updateStakeholder(id, stakeholder) {
    this.dataService.getEntityData('stakeholders', id)
      .then((resCustomerData) => {
        this.stakeholder = resCustomerData;
        this.stakeholder.name = stakeholder.name;
        this.stakeholder.role = stakeholder.role;
        this.stakeholder.email = stakeholder.email;
        this.stakeholder.phoneNo = stakeholder.phoneNo;
        this.stakeholder.raci = stakeholder.raci;

        let tempStakeHolder = this.stakeholder;
        this.dataService.updateEntity('stakeholders', this.stakeholder.id, this.stakeholder)
          .then((resCustomerData) => {
            let index;
            this.customerStakeholders.forEach(function(add, i) {
              if (add.id === tempStakeHolder.id)
                index = i;
            });
            this.customerStakeholders[index] = tempStakeHolder;
          },
          (err) => console.log("StakeHolder could not be updated :" + err)
          );
      });
  }

  updateTeam(id, team) {
    this.dataService.getEntityData('teams', id)
      .then((resCustomerData) => {
        this.team = resCustomerData;
        this.team.name = team.name;
        this.team.specialization = team.specialization;

        let tempTeam = this.team;
        this.dataService.updateEntity('teams', this.team.id, this.team)
          .then((resCustomerData) => {
            let index;
            this.customerTeams.forEach(function(add, i) {
              if (add.id === tempTeam.id)
                index = i;
            });
            this.customerTeams[index] = tempTeam;
          },
          (err) => console.log("Team could not be updated :" + err)
          );
      });
  }

  updateGoal(id, goal) {
    this.dataService.getEntityData('goals', id)
      .then((resCustomerData) => {
        this.goal = resCustomerData;
        this.goal.description = goal.description;
        this.goal.status = goal.status;
        this.goal.details = goal.details;
        this.goal.signedBy = goal.signedBy;
        let tempGoal = this.goal;

        console.log(this.goal)
        this.dataService.updateEntity('goals', this.goal.id, this.goal)
          .then((resCustomerData) => {
            let index;
            this.customerGoals.forEach(function(add, i) {
              if (add.id === tempGoal.id)
                index = i;
            });
            this.customerGoals[index] = tempGoal;
          },
          (err) => console.log("Goal could not be updated :" + err)
          );
      });
  }

  updateTravel(id, travel) {
    travel.id = id;
    travel.customerId = this.travel.customerId;
    console.log(this.customerTravels)

    this.dataService.updateEntity('travels', this.travel.id, travel)
      .then((resCustomerData) => {
        let index;
        this.customerTravels.forEach(function(add, i) {
          if (add.id === id)
            index = i;
        });
        this.customerTravels[index] = travel;
      },
      (err) => console.log("Travel could not be updated :" + err)
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
      (err) => console.log("array could not be deleted :" + err)
      );
  }

}
